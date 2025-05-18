<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use Illuminate\Support\Facades\Auth;

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
            ]);

            // Buscar el menú del usuario
            $menu = \App\Models\Menu::where('user_id', $request->usuario_id)->first();
            if (!$menu) {
                return response()->json(['error' => 'No se encontró menú para el usuario'], 404);
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
}