<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receta;

class RecetaController extends Controller
{
    public function recetas()
    {
        $recetas = Receta::all();
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
            'categoria' => 'required|integer|exists:categorias,id_categoria',
            // Cambiar a la tabla y columna correctas:
            'tiempo_comida' => 'required|integer|exists:tiempo_comida,id_tipo',
        ]);

        $receta = new Receta();
        $receta->nombre = $request->nombre;
        $receta->descripcion = $request->descripcion;
        $receta->instrucciones = $request->instrucciones;
        $receta->tiempo_preparacion = $request->tiempo_preparacion;

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $filename = 'receta_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            // Guardar en la carpeta correcta: storage/app/public/recetas
            $file->move(storage_path('app/public/recetas'), $filename);
            $receta->imagen = '/storage/recetas/' . $filename;
        }

        $receta->save();

        // Guardar ingredientes en receta_ingrediente
        $ingredientes = json_decode($request->ingredientes, true);
        foreach ($ingredientes as $item) {
            if (isset($item['ingredienteId'], $item['cantidad'])) {
                \DB::table('receta_ingrediente')->insert([
                    'id_receta' => $receta->id_receta,
                    'id_ingrediente' => $item['ingredienteId'],
                    'cantidad' => $item['cantidad'],
                ]);
            }
        }

        // Guardar tiempo de comida en receta_tiempo_comida
        \DB::table('receta_tiempo_comida')->insert([
            'id_receta' => $receta->id_receta,
            'id_tipo' => $request->tiempo_comida, // columna correcta según tu tabla
        ]);

        // Guardar categoría en receta_categoria
        \DB::table('receta_categoria')->insert([
            'receta_id' => $receta->id_receta,
            'categoria_id' => $request->categoria,
        ]);

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