<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ingrediente;

class IngredienteController extends Controller
{
    public function index()
    {
        $ingredientes = Ingrediente::all(['id_ingrediente as id', 'nombre']);
        return response()->json($ingredientes);
    }

    // POST /api/ingredientes/by-ids
    public function getByIds(Request $request)
    {
        $ids = $request->input('ids');
        if (!is_array($ids) || empty($ids)) {
            return response()->json([], 200);
        }
        $ingredientes = Ingrediente::whereIn('id_ingrediente', $ids)->get();
        return response()->json($ingredientes);
    }
}