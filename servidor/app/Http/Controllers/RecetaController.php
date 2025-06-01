<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receta;

class RecetaController extends Controller
{
    public function recetas()
    {
        // Cargar recetas con categorías y tiempos de comida
        $recetas = Receta::with([
            'categorias:id_categoria,nombre',
            'tiemposComida:id_tipo,nombre'
        ])->get();
        // Formatear para que cada receta tenga 'categorias' y 'tiempos_comida' como arrays
        $recetas = $recetas->map(function($receta) {
            $arr = $receta->toArray();
            $arr['categorias'] = $receta->categorias->map(function($cat) {
                return [
                    'id_categoria' => $cat->id_categoria,
                    'nombre' => $cat->nombre
                ];
            })->values();
            $arr['tiempos_comida'] = $receta->tiemposComida->map(function($tc) {
                return [
                    'id_tipo' => $tc->id_tipo,
                    'nombre' => $tc->nombre
                ];
            })->values();
            return $arr;
        });
        return response()->json($recetas);
    }

    public function recetaPorId($id)
    {
        $receta = \App\Models\Receta::find($id);
        if ($receta) {
            return response()->json($receta);
        } else {
            return response()->json(['message' => 'Receta no encontrada'], 404);
        }
    }

    public function store(Request $request)
    {
        // Forzar a entero los campos que pueden venir como string desde multipart/form-data
        $request->merge([
            'tiempo_comida' => (int) $request->input('tiempo_comida'),
            'categoria' => (int) $request->input('categoria'),
        ]);
        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string|max:300',
            'instrucciones' => 'required|string|max:1000',
            'tiempo_preparacion' => 'required|numeric|min:1',
            'imagen' => 'nullable|image|max:4096',
            'ingredientes' => 'required|json',
            'categorias' => 'required|json',
            'tiempos_comida' => 'required|json',
        ]);

        // Obtener el usuario autenticado por el token
        $user = $request->user();

        $receta = new Receta();
        $receta->nombre = $request->nombre;
        $receta->descripcion = $request->descripcion;
        $receta->instrucciones = $request->instrucciones;
        $receta->tiempo_preparacion = $request->tiempo_preparacion;
        $receta->user_id = $user ? $user->id : null;

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $filename = 'receta_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(storage_path('app/public/recetas'), $filename);
            $receta->imagen = '/storage/recetas/' . $filename;
        }

        $receta->save();

        // Calcular valores nutricionales totales y guardar ingredientes en receta_ingrediente SIN duplicados
        $totalCalorias = 0;
        $totalCarbohidratos = 0;
        $totalGrasas = 0;
        $totalProteinas = 0;

        $ingredientes = json_decode($request->ingredientes, true);
        $ingredientesUnicos = [];
        foreach ($ingredientes as $item) {
            $ingredienteId = $item['id'] ?? $item['ingredienteId'] ?? null;
            $cantidad = $item['cantidad'] ?? null;
            if ($ingredienteId && $cantidad && !isset($ingredientesUnicos[$ingredienteId])) {
                // Guardar en tabla pivote solo si no existe ya esa combinación
                $existe = \DB::table('receta_ingrediente')
                    ->where('id_receta', $receta->id_receta)
                    ->where('id_ingrediente', $ingredienteId)
                    ->exists();
                if (!$existe) {
                    \DB::table('receta_ingrediente')->insert([
                        'id_receta' => $receta->id_receta,
                        'id_ingrediente' => $ingredienteId,
                        'cantidad' => $cantidad,
                    ]);
                }
                // Marcar como añadido
                $ingredientesUnicos[$ingredienteId] = true;
                // Obtener datos nutricionales del ingrediente
                $ing = \App\Models\Ingrediente::find($ingredienteId);
                if ($ing) {
                    $totalCalorias += ($ing->calorias ?? 0) * $cantidad;
                    $totalCarbohidratos += ($ing->carbohidratos ?? 0) * $cantidad;
                    $totalGrasas += ($ing->grasas ?? 0) * $cantidad;
                    $totalProteinas += ($ing->proteinas ?? 0) * $cantidad;
                }
            }
        }
        // Guardar los totales en la receta
        $receta->calorias = $totalCalorias;
        $receta->carbohidratos = $totalCarbohidratos;
        $receta->grasas = $totalGrasas;
        $receta->proteinas = $totalProteinas;
        $receta->save();

        // Guardar tiempos de comida (array)
        $tiemposComida = json_decode($request->tiempos_comida, true);
        if (is_array($tiemposComida)) {
            foreach ($tiemposComida as $id_tipo) {
                \DB::table('receta_tiempo_comida')->insert([
                    'id_receta' => $receta->id_receta,
                    'id_tipo' => $id_tipo,
                ]);
            }
        }

        // Guardar categorías (array)
        $categorias = json_decode($request->categorias, true);
        if (is_array($categorias)) {
            foreach ($categorias as $categoria_id) {
                \DB::table('receta_categoria')->insert([
                    'receta_id' => $receta->id_receta,
                    'categoria_id' => $categoria_id,
                ]);
            }
        }

        return response()->json(['message' => 'Receta creada', 'receta' => $receta], 201);
    }

    public function recetasByIds(Request $request)
    {
        $ids = $request->query('ids');
        if (!$ids) return response()->json([]);
        if (is_string($ids)) {
            $ids = explode(',', $ids);
        }
        $recetas = Receta::whereIn('id_receta', $ids)->get();
        return response()->json($recetas);
    }

    // Obtener recetas por categoría (puede ser varias por receta)
    public function recetasPorCategoria(Request $request)
    {
        $categoriaId = $request->query('categoria_id');
        if (!$categoriaId) {
            return response()->json([], 200);
        }
        $recetas = \DB::table('receta_categoria')
            ->join('recetas', 'receta_categoria.receta_id', '=', 'recetas.id_receta')
            ->where('receta_categoria.categoria_id', $categoriaId)
            ->select('recetas.*')
            ->get();
        return response()->json($recetas);
    }
}