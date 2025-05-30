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
            2 => [4, 10, 13], // Tortilla de patatas: Huevos, Postres, Desayuno
            3 => [2, 14], // Salmón al horno: Pescados, Mariscos
            4 => [8, 3], // Gazpacho: Ensaladas, Verduras
            5 => [6, 14, 15], // Paella mixta: Arroces, Mariscos, Internacional
            6 => [5, 1, 15], // Spaghetti Bolognese: Pastas, Carnes, Internacional
            7 => [9, 10, 12, 11], // Smoothie de frutas: Bebidas, Postres, Desayuno, Vegano
            8 => [1, 3, 11], // Hamburguesa vegana: Carnes, Verduras, Vegano
            9 => [10, 12], // Arroz con leche: Postres, Desayuno
            10 => [10, 12], // Sándwich mixto: Postres, Desayuno
            11 => [10, 12], // Yogur con granola: Postres, Desayuno
            12 => [8, 3, 12], // Ensalada de frutas: Ensaladas, Verduras, Desayuno
            13 => [4, 10, 12], // Omelette de queso: Huevos, Postres, Desayuno
            14 => [9, 3, 11], // Smoothie verde: Bebidas, Verduras, Vegano
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
