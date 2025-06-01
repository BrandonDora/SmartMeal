<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecetaCategoriaSeeder extends Seeder
{
    public function run(): void
    {
        // Limpia la tabla pivote
        DB::table('receta_categoria')->truncate();

        // Relaciona recetas con categorías (pueden tener varias)
        $relaciones = [
            // id_receta => [id_categoria, ...]
            1 => [1], // Pollo a la plancha: Carnes
            2 => [3, 8], // Tortilla de patatas: Huevos, Postres
            3 => [2], // Salmón al horno: Pescados
            4 => [6], // Gazpacho: Ensaladas
            5 => [5, 11], // Paella mixta: Arroces, Internacional
            6 => [4, 1, 11], // Spaghetti Bolognese: Pastas, Carnes, Internacional
            7 => [7, 8, 9], // Smoothie de frutas: Bebidas, Postres, Vegano
            8 => [1, 9], // Hamburguesa vegana: Carnes, Vegano
            9 => [8], // Arroz con leche: Postres
            10 => [8], // Sándwich mixto: Postres
            11 => [8], // Yogur con granola: Postres
            12 => [6, 8], // Ensalada de frutas: Ensaladas, Postres
            13 => [3, 8], // Omelette de queso: Huevos, Postres
            14 => [7, 9], // Smoothie verde: Bebidas, Vegano
            15 => [12], // Cuscús de cordero Halal: Halal
            16 => [12], // Tajine de pollo Halal: Halal
            17 => [9], // Falafel vegano: Vegano
            18 => [6, 9], // Ensalada tabulé: Ensaladas, Vegano
            19 => [3], // Shakshuka: Huevos
        ];

        foreach ($relaciones as $id_receta => $categorias) {
            foreach ($categorias as $id_categoria) {
                DB::table('receta_categoria')->insert([
                    'receta_id' => $id_receta,
                    'categoria_id' => $id_categoria,
                ]);
            }
        }
    }
}
