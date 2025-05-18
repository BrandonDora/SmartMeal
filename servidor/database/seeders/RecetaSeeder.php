<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecetaSeeder extends Seeder
{
    public function run(): void
    {
        $Ensalada = DB::table('recetas')->insertGetId([
            'nombre'       => 'Ensalada',
            'descripcion'  => 'Ensalada de lechuga.',
            'imagen'       => 'http://localhost:8000/storage/recetas/Ensalada.png',
            'calorias'     => 420,
            'proteinas'    => 45,
            'grasas'       => 5,
            'carbohidratos'=> 35,
        ]);

        $Pancake = DB::table('recetas')->insertGetId([
            'nombre'       => 'Pancakes',
            'descripcion'  => 'Pancake rico',
            'imagen'       => 'http://localhost:8000/storage/recetas/Pancakes.png',
            'calorias'     => 380,
            'proteinas'    => 35,
            'grasas'       => 15,
            'carbohidratos'=> 40,
        ]);

        $Tostada = DB::table('recetas')->insertGetId([
            'nombre'       => 'Tostadas',
            'descripcion'  => 'Tostadas con mermelada',
            'imagen'       => 'http://localhost:8000/storage/recetas/Tostadas.png',
            'calorias'     => 280,
            'proteinas'    => 35,
            'grasas'       => 15,
            'carbohidratos'=> 40,
        ]);

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
