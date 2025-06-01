<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Models\Receta;
use App\Models\PreferenciaNutricional;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    public function menus(Request $request)
    {
        $user = $request->user(); // usuario autenticado por Sanctum
        $menus = Menu::where('user_id', $user->id)->get();
        return response()->json($menus);
    }
    
    public function menuReceta(Request $request, $idMenu = null)
    {
        if ($request->isMethod('post')) {
            $request->validate([
                'usuario_id' => 'required|integer',
                'receta_id' => 'required|integer',
                'menu_id' => 'required|integer', // <-- validamos que venga el menú
            ]);

            // Buscar el menú por el id recibido
            $menu = \App\Models\Menu::where('id_menu', $request->menu_id)->first();
            if (!$menu) {
                return response()->json(['error' => 'No se encontró menú con ese id'], 404);
            }

            // Comprobar si la receta ya está en el menú seleccionado
            $existe = \DB::table('menu_receta')
                ->where('id_menu', $menu->id_menu)
                ->where('id_receta', $request->receta_id)
                ->exists();
            if ($existe) {
                return response()->json(['message' => 'Esta receta ya está añadida'], 409);
            }

            // Insertar en la tabla pivote menu_receta
            \DB::table('menu_receta')->insert([
                'id_menu' => $menu->id_menu,
                'id_receta' => $request->receta_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json(['message' => 'Receta añadida al menú'], 201);
        }
        // Si es GET, devolver los id_receta del menú recibido
        if ($request->isMethod('get') && $idMenu) {
            $recetas = \DB::table('menu_receta')
                ->where('id_menu', $idMenu)
                ->pluck('id_receta');
            return response()->json($recetas);
        }
        return response()->json(['error' => 'Método no soportado o falta id_menu'], 400);
    }
    
    public function recetasByIds(Request $request)
    {
        $ids = $request->query('ids');
        if (is_string($ids)) {
            $ids = [$ids];
        }
        if (!$ids || !is_array($ids) || count($ids) === 0) {
            return response()->json([]);
        }
        $recetas = \App\Models\Receta::whereIn('id_receta', $ids)->get();
        return response()->json($recetas);
    }
    
    public function crearMenu(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);
        $menu = new Menu();
        $menu->nombre = $validated['nombre'];
        $menu->user_id = $user->id;
        $menu->fecha_creacion = now();
        $menu->save();
        return response()->json($menu, 201);
    }

    public function recetasDeMenu($id_menu)
    {
        $menu = \App\Models\Menu::with('recetas')->find($id_menu);
        if (!$menu) {
            return response()->json(['error' => 'Menú no encontrado'], 404);
        }
        return response()->json($menu->recetas);
    }
    
    public function destroy(Request $request, $id_menu)
    {
        $user = $request->user();
        $menu = Menu::where('id_menu', $id_menu)->where('user_id', $user->id)->first();
        if (!$menu) {
            return response()->json(['error' => 'Menú no encontrado'], 404);
        }
        $menu->delete();
        return response()->json(['message' => 'Menú eliminado correctamente']);
    }
    
    public function generarMenuPorCategorias(Request $request)
    {
        $user = $request->user();
        $categorias = $request->input('categorias'); // array de ids de categoría
        $nombreMenu = $request->input('nombre');
        if (!is_array($categorias) || count($categorias) === 0 || !$nombreMenu) {
            return response()->json(['error' => 'Datos incompletos'], 400);
        }

        // 1. Obtener todos los ids de recetas que pertenezcan a esas categorías (sin duplicados)
        $recetaIds = DB::table('receta_categoria')
            ->whereIn('categoria_id', $categorias)
            ->pluck('receta_id')
            ->unique()
            ->values()
            ->toArray();
        if (count($recetaIds) < 3) {
            return response()->json(['error' => 'No hay suficientes recetas para generar el menú'], 400);
        }

        // 2. Obtener calorías de esas recetas
        $recetas = Receta::whereIn('id_receta', $recetaIds)
            ->select('id_receta', 'calorias')
            ->get();

        // 3. Obtener calorías deseadas del usuario
        $prefs = PreferenciaNutricional::where('user_id', $user->id)->first();
        if (!$prefs) {
            return response()->json(['error' => 'No se encontraron preferencias nutricionales'], 400);
        }
        $caloriasDeseadas = $prefs->calorias_deseadas;

        // 4. Buscar la combinación de 3 recetas cuya suma de calorías sea más cercana a caloriasDeseadas
        $mejorDiferencia = null;
        $mejorTrio = null;
        $n = count($recetas);
        for ($i = 0; $i < $n - 2; $i++) {
            for ($j = $i + 1; $j < $n - 1; $j++) {
                for ($k = $j + 1; $k < $n; $k++) {
                    $suma = $recetas[$i]->calorias + $recetas[$j]->calorias + $recetas[$k]->calorias;
                    $diferencia = abs($caloriasDeseadas - $suma);
                    if ($mejorDiferencia === null || $diferencia < $mejorDiferencia) {
                        $mejorDiferencia = $diferencia;
                        $mejorTrio = [$recetas[$i]->id_receta, $recetas[$j]->id_receta, $recetas[$k]->id_receta];
                    }
                }
            }
        }
        if (!$mejorTrio) {
            return response()->json(['error' => 'No se pudo encontrar una combinación adecuada'], 400);
        }

        // 5. Crear el menú
        $menu = new Menu();
        $menu->nombre = $nombreMenu;
        $menu->user_id = $user->id;
        $menu->fecha_creacion = now();
        $menu->save();

        // 6. Insertar las recetas en menu_receta
        foreach ($mejorTrio as $idReceta) {
            DB::table('menu_receta')->insert([
                'id_menu' => $menu->id_menu,
                'id_receta' => $idReceta,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return response()->json([
            'menu' => $menu,
            'recetas_elegidas' => $mejorTrio,
        ], 201);
    }
}