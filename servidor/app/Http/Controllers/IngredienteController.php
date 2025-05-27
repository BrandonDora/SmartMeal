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
}