<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RecetaIngrediente;

class RecetaIngredienteController extends Controller
{
    // POST /api/receta-ingredientes/by-recetas
    public function getByRecetaIds(Request $request)
    {
        $recetaIds = $request->input('receta_ids');
        if (!is_array($recetaIds) || empty($recetaIds)) {
            return response()->json([], 200);
        }
        $result = RecetaIngrediente::whereIn('id_receta', $recetaIds)->get();
        return response()->json($result);
    }
}
