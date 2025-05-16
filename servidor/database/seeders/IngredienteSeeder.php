<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IngredienteSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ingredientes')->insert([
            [
                'nombre'     => 'Pechuga de pollo',
                'calorias'   => 165,
                'proteinas'  => 31,
                'grasas'     => 3.6,
                'carbohidratos' => 0,
            ],
            [
                'nombre'     => 'Arroz integral',
                'calorias'   => 111,
                'proteinas'  => 2.6,
                'grasas'     => 0.9,
                'carbohidratos' => 23,
            ],
            [
                'nombre'     => 'Brócoli',
                'calorias'   => 34,
                'proteinas'  => 2.8,
                'grasas'     => 0.4,
                'carbohidratos' => 7,
            ],
        ]);
    }
}