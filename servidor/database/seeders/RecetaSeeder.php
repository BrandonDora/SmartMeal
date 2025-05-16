<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecetaSeeder extends Seeder
{
    public function run(): void
    {
        $polloId = DB::table('recetas')->insertGetId([
            'nombre'       => 'Pollo con arroz y brócoli',
            'descripcion'  => 'Fácil plato completo para almuerzo.',
            'calorias'     => 450,
            'proteinas'    => 36,
            'grasas'       => 10,
            'carbohidratos'=> 50,
        ]);

        DB::table('receta_ingrediente')->insert([
            ['id_receta' => $polloId, 'id_ingrediente' => 1, 'cantidad' => 150],
            ['id_receta' => $polloId, 'id_ingrediente' => 2, 'cantidad' => 100],
            ['id_receta' => $polloId, 'id_ingrediente' => 3, 'cantidad' => 80],
        ]);

        $batidoId = DB::table('recetas')->insertGetId([
            'nombre'       => 'Batido de proteínas vegano',
            'descripcion'  => 'Ideal post‑entreno.',
            'calorias'     => 300,
            'proteinas'    => 25,
            'grasas'       => 8,
            'carbohidratos'=> 35,
        ]);
    }
}
