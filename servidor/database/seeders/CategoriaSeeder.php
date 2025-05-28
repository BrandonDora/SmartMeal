<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categorias')->insert([
            ['nombre' => 'Vegetariano'],
            ['nombre' => 'Vegano'],
            ['nombre' => 'Sin gluten'],
            ['nombre' => 'Lácteos'],
            ['nombre' => 'Postres'],
            ['nombre' => 'Desayuno'],
            ['nombre' => 'Brunch'],
            ['nombre' => 'Almuerzo'],
            ['nombre' => 'Cena'],
            ['nombre' => 'Entrantes'],
            ['nombre' => 'Aperitivos'],
            ['nombre' => 'Sopas'],
            ['nombre' => 'Cremas'],
            ['nombre' => 'Ensaladas'],
            ['nombre' => 'Bebidas'],
            ['nombre' => 'Jugos'],
            ['nombre' => 'Cócteles'],
            ['nombre' => 'Rápido'],
            ['nombre' => 'Saludable'],
            ['nombre' => 'Tradicional'],
            ['nombre' => 'Internacional'],
            ['nombre' => 'Mariscos'],
            ['nombre' => 'Pastas'],
            ['nombre' => 'Carnes'],
            ['nombre' => 'Pescados'],
            ['nombre' => 'Repostería'],
            ['nombre' => 'Panadería'],
            ['nombre' => 'Snacks'],
            ['nombre' => 'Salsas'],
            ['nombre' => 'Barbacoa'],
        ]);

    }
}
