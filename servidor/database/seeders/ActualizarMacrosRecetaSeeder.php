<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActualizarMacrosRecetaSeeder extends Seeder
{
    public function run(): void
    {
        $recetas = DB::table('recetas')->get();
        $ingredientes = DB::table('ingredientes')->get()->keyBy('id_ingrediente');
        $recetaIngredientes = DB::table('receta_ingrediente')->get();

        foreach ($recetas as $receta) {
            $ingredientesReceta = $recetaIngredientes->where('id_receta', $receta->id_receta);
            $calorias = 0;
            $proteinas = 0;
            $grasas = 0;
            $carbohidratos = 0;
            foreach ($ingredientesReceta as $ri) {
                $ing = $ingredientes[$ri->id_ingrediente] ?? null;
                if ($ing) {
                    $cantidad = $ri->cantidad;
                    $calorias      += $ing->calorias * $cantidad;
                    $proteinas     += $ing->proteinas * $cantidad;
                    $grasas        += $ing->grasas * $cantidad;
                    $carbohidratos += $ing->carbohidratos * $cantidad;
                }
            }
            DB::table('recetas')->where('id_receta', $receta->id_receta)->update([
                'calorias'      => round($calorias),
                'proteinas'     => round($proteinas),
                'grasas'        => round($grasas),
                'carbohidratos' => round($carbohidratos),
            ]);
        }
    }
}
