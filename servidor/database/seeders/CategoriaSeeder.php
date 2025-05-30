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
        // Desactiva las restricciones de claves foráneas para truncar sin errores
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('receta_categoria')->truncate();
        DB::table('categorias')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('categorias')->insert([
            ['nombre' => 'Carnes'],
            ['nombre' => 'Pescados'],
            ['nombre' => 'Verduras'],
            ['nombre' => 'Huevos'],
            ['nombre' => 'Pastas'],
            ['nombre' => 'Arroces'],
            ['nombre' => 'Sopas y Cremas'],
            ['nombre' => 'Ensaladas'],
            ['nombre' => 'Bebidas'],
            ['nombre' => 'Postres'],
            ['nombre' => 'Vegano'],
            ['nombre' => 'Vegetariano'],
            ['nombre' => 'Desayuno'],
            ['nombre' => 'Mariscos'],
            ['nombre' => 'Internacional'],
        ]);
    }
}
