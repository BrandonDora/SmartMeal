<?php

namespace App\Http\Controllers;

use App\Models\PreferenciaNutricional;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PreferenciaNutricionalController extends Controller
{
    public function calcular(Request $request)
    {
        $validated = $request->validate([
            'weight' => 'required|numeric|min:1',
            'height' => 'required|numeric|min:1',
            'age' => 'required|numeric|min:1',
            'sexo' => 'required|in:hombre,mujer',
            'activity' => 'required|numeric',
            'goal' => 'required|string',
        ]);

        $peso = $validated['weight'];
        $altura = $validated['height'];
        $edad = $validated['age'];
        $sexo = $validated['sexo'];
        $actividad = $validated['activity'];
        $objetivo = $validated['goal'];

        // Calcular TMB
        if ($sexo === 'hombre') {
            $tmb = (10 * $peso) + (6.25 * $altura) - (5 * $edad) + 5;
        } else {
            $tmb = (10 * $peso) + (6.25 * $altura) - (5 * $edad) - 161;
        }

        // Calorías de mantenimiento
        $calorias_mantenimiento = $tmb * $actividad;

        // Calorías deseadas
        if ($objetivo === 'subir') {
            $calorias_deseadas = $calorias_mantenimiento * 1.15;
        } elseif ($objetivo === 'bajar') {
            $calorias_deseadas = $calorias_mantenimiento * 0.85;
        } else {
            $calorias_deseadas = $calorias_mantenimiento;
        }

        // Guardar en la base de datos
        $user = $request->user();
        if ($user) {
            PreferenciaNutricional::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'calorias_mantenimiento' => round($calorias_mantenimiento),
                    'calorias_deseadas' => round($calorias_deseadas),
                    'objetivo' => $objetivo
                ]
            );
        }

        return response()->json([
            'tmb' => round($tmb),
            'calorias_mantenimiento' => round($calorias_mantenimiento),
        ]);
    }

    public function showByUser($id)
    {
        $preferencias = PreferenciaNutricional::where('user_id', $id)->first();
        if ($preferencias) {
            return response()->json([$preferencias]);
        } else {
            return response()->json([]);
        }
    }
}