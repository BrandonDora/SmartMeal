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
        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string|max:300',
            'instrucciones' => 'required|string|max:1000',
            'tiempo_preparacion' => 'required|numeric|min:1',
            'imagen' => 'nullable|image|max:4096',
        ]);

        $receta = new Receta();
        $receta->nombre = $request->nombre;
        $receta->descripcion = $request->descripcion;
        $receta->instrucciones = $request->instrucciones;
        $receta->tiempo_preparacion = $request->tiempo_preparacion;

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('public/recetas');
            $receta->imagen = str_replace('public/', '/storage/', $path);
        }

        $receta->save();
        return response()->json(['message' => 'Receta creada', 'receta' => $receta], 201);
    }
}