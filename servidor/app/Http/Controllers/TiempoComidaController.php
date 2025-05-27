<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TiempoComida;

class TiempoComidaController extends Controller
{
    public function index()
    {
        return response()->json(TiempoComida::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_receta' => 'required|integer|exists:recetas,id_receta',
            'id_tiempo_comida' => 'required|integer|exists:tiempo_comidas,id',
        ]);

        // Insertar en la tabla pivote receta_tiempo_comida
        \DB::table('receta_tiempo_comida')->insert([
            'id_receta' => $request->id_receta,
            'id_tiempo_comida' => $request->id_tiempo_comida,
        ]);

        return response()->json(['message' => 'Asociación guardada'], 201);
    }
}