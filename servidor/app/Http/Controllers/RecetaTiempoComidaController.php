<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RecetaTiempoComidaController extends Controller
{
    // Devuelve todas las relaciones o filtra por id_tipo
    public function index(Request $request)
    {
        $id_tipo = $request->query('id_tipo');
        $query = \DB::table('receta_tiempo_comida');
        if ($id_tipo) {
            $query->where('id_tipo', $id_tipo);
        }
        return response()->json($query->get());
    }
}
