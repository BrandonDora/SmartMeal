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
}