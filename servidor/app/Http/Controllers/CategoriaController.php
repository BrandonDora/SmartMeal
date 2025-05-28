<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function index()
    {
        // Devuelve todas las categorías ordenadas alfabéticamente
        return response()->json(Categoria::orderBy('nombre')->get());
    }
}
