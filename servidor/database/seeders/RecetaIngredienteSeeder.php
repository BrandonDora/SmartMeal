<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecetaIngredienteSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('receta_ingrediente')->insert([
            // Pollo a la plancha
            ['id_receta' => 1, 'id_ingrediente' => 1, 'cantidad' => 150], // 150g pechuga de pollo
            ['id_receta' => 1, 'id_ingrediente' => 5, 'cantidad' => 10],  // 10ml aceite de oliva

            // Tortilla de patatas
            ['id_receta' => 2, 'id_ingrediente' => 3, 'cantidad' => 3],   // 3 huevos
            ['id_receta' => 2, 'id_ingrediente' => 2, 'cantidad' => 200], // 200g patata
            ['id_receta' => 2, 'id_ingrediente' => 4, 'cantidad' => 100], // 100g cebolla
            ['id_receta' => 2, 'id_ingrediente' => 5, 'cantidad' => 30],  // 30ml aceite de oliva

            // Salmón al horno
            ['id_receta' => 3, 'id_ingrediente' => 6, 'cantidad' => 180], // 180g salmón
            ['id_receta' => 3, 'id_ingrediente' => 5, 'cantidad' => 10],  // 10ml aceite de oliva

            // Gazpacho
            ['id_receta' => 4, 'id_ingrediente' => 7, 'cantidad' => 400], // 400g tomate
            ['id_receta' => 4, 'id_ingrediente' => 8, 'cantidad' => 100], // 100g pepino
            ['id_receta' => 4, 'id_ingrediente' => 9, 'cantidad' => 100], // 100g pimiento
            ['id_receta' => 4, 'id_ingrediente' => 4, 'cantidad' => 50],  // 50g cebolla
            ['id_receta' => 4, 'id_ingrediente' => 5, 'cantidad' => 30],  // 30ml aceite de oliva

            // Paella mixta (corregido: tomate 150+50=200g, arroz 50g)
            ['id_receta' => 5, 'id_ingrediente' => 7, 'cantidad' => 200], // 200g tomate
            ['id_receta' => 5, 'id_ingrediente' => 1, 'cantidad' => 100], // 100g pollo
            ['id_receta' => 5, 'id_ingrediente' => 6, 'cantidad' => 80],  // 80g salmón (como marisco)
            ['id_receta' => 5, 'id_ingrediente' => 5, 'cantidad' => 30],  // 30ml aceite de oliva
            ['id_receta' => 5, 'id_ingrediente' => 2, 'cantidad' => 100], // 100g patata
            ['id_receta' => 5, 'id_ingrediente' => 4, 'cantidad' => 50],  // 50g cebolla
            ['id_receta' => 5, 'id_ingrediente' => 11, 'cantidad' => 50], // 50g arroz

            // Spaghetti Bolognese
            ['id_receta' => 6, 'id_ingrediente' => 10, 'cantidad' => 100], // 100g carne picada
            ['id_receta' => 6, 'id_ingrediente' => 11, 'cantidad' => 80],  // 80g pasta
            ['id_receta' => 6, 'id_ingrediente' => 7, 'cantidad' => 100],  // 100g tomate
            ['id_receta' => 6, 'id_ingrediente' => 4, 'cantidad' => 50],   // 50g cebolla
            ['id_receta' => 6, 'id_ingrediente' => 5, 'cantidad' => 20],   // 20ml aceite de oliva

            // Smoothie de frutas
            ['id_receta' => 7, 'id_ingrediente' => 12, 'cantidad' => 100], // 100g plátano
            ['id_receta' => 7, 'id_ingrediente' => 13, 'cantidad' => 50],  // 50g frutos rojos
            ['id_receta' => 7, 'id_ingrediente' => 14, 'cantidad' => 125], // 125g yogur

            // Hamburguesa vegana
            ['id_receta' => 8, 'id_ingrediente' => 15, 'cantidad' => 80],  // 80g quinoa
            ['id_receta' => 8, 'id_ingrediente' => 16, 'cantidad' => 120], // 120g garbanzos cocidos
            ['id_receta' => 8, 'id_ingrediente' => 7, 'cantidad' => 50],   // 50g tomate

            // Arroz con leche
            ['id_receta' => 9, 'id_ingrediente' => 11, 'cantidad' => 50],   // 50g arroz
            ['id_receta' => 9, 'id_ingrediente' => 14, 'cantidad' => 200], // 200g yogur (como sustituto de leche)
            ['id_receta' => 9, 'id_ingrediente' => 12, 'cantidad' => 50],  // 50g plátano (como endulzante)

            // Sándwich mixto
            ['id_receta' => 10, 'id_ingrediente' => 11, 'cantidad' => 60], // 60g pasta (como pan)
            ['id_receta' => 10, 'id_ingrediente' => 17, 'cantidad' => 30], // 30g queso

            // Yogur con granola
            ['id_receta' => 11, 'id_ingrediente' => 14, 'cantidad' => 125], // 125g yogur
            ['id_receta' => 11, 'id_ingrediente' => 15, 'cantidad' => 30],  // 30g quinoa (como granola)

            // Ensalada de frutas
            ['id_receta' => 12, 'id_ingrediente' => 18, 'cantidad' => 80],  // 80g manzana
            ['id_receta' => 12, 'id_ingrediente' => 12, 'cantidad' => 80],  // 80g plátano
            ['id_receta' => 12, 'id_ingrediente' => 19, 'cantidad' => 50],  // 50g fresa
            ['id_receta' => 12, 'id_ingrediente' => 20, 'cantidad' => 50],  // 50g uva

            // Omelette de queso
            ['id_receta' => 13, 'id_ingrediente' => 3, 'cantidad' => 2],    // 2 huevos
            ['id_receta' => 13, 'id_ingrediente' => 17, 'cantidad' => 30],  // 30g queso
            ['id_receta' => 13, 'id_ingrediente' => 5, 'cantidad' => 10],   // 10ml aceite de oliva

            // Smoothie verde
            ['id_receta' => 14, 'id_ingrediente' => 21, 'cantidad' => 50],  // 50g espinaca
            ['id_receta' => 14, 'id_ingrediente' => 12, 'cantidad' => 80],  // 80g plátano
            ['id_receta' => 14, 'id_ingrediente' => 18, 'cantidad' => 80],  // 80g manzana

            // Cuscús de cordero Halal
            ['id_receta' => 15, 'id_ingrediente' => 22, 'cantidad' => 120], // 120g cordero Halal
            ['id_receta' => 15, 'id_ingrediente' => 23, 'cantidad' => 60],  // 60g cuscús
            ['id_receta' => 15, 'id_ingrediente' => 4,  'cantidad' => 40],  // 40g cebolla
            ['id_receta' => 15, 'id_ingrediente' => 24, 'cantidad' => 50],  // 50g calabacín
            ['id_receta' => 15, 'id_ingrediente' => 25, 'cantidad' => 30],  // 30g zanahoria
            ['id_receta' => 15, 'id_ingrediente' => 5,  'cantidad' => 15],  // 15ml aceite de oliva

            // Tajine de pollo Halal
            ['id_receta' => 16, 'id_ingrediente' => 1,  'cantidad' => 120], // 120g pechuga de pollo (Halal)
            ['id_receta' => 16, 'id_ingrediente' => 4,  'cantidad' => 40],  // 40g cebolla
            ['id_receta' => 16, 'id_ingrediente' => 5,  'cantidad' => 15],  // 15ml aceite de oliva
            ['id_receta' => 16, 'id_ingrediente' => 26, 'cantidad' => 30],  // 30g ciruelas pasas
            ['id_receta' => 16, 'id_ingrediente' => 27, 'cantidad' => 20],  // 20g almendras
            ['id_receta' => 16, 'id_ingrediente' => 28, 'cantidad' => 5],   // 5g jengibre

            // Falafel vegano
            ['id_receta' => 17, 'id_ingrediente' => 16, 'cantidad' => 120], // 120g garbanzos cocidos
            ['id_receta' => 17, 'id_ingrediente' => 4,  'cantidad' => 30],  // 30g cebolla
            ['id_receta' => 17, 'id_ingrediente' => 29, 'cantidad' => 10],  // 10g perejil
            ['id_receta' => 17, 'id_ingrediente' => 5,  'cantidad' => 10],  // 10ml aceite de oliva
            ['id_receta' => 17, 'id_ingrediente' => 31, 'cantidad' => 15],  // 15g tahini

            // Ensalada tabulé
            ['id_receta' => 18, 'id_ingrediente' => 32, 'cantidad' => 60],  // 60g bulgur
            ['id_receta' => 18, 'id_ingrediente' => 7,  'cantidad' => 50],  // 50g tomate
            ['id_receta' => 18, 'id_ingrediente' => 8,  'cantidad' => 30],  // 30g pepino
            ['id_receta' => 18, 'id_ingrediente' => 4,  'cantidad' => 20],  // 20g cebolla
            ['id_receta' => 18, 'id_ingrediente' => 29, 'cantidad' => 10],  // 10g perejil
            ['id_receta' => 18, 'id_ingrediente' => 30, 'cantidad' => 5],   // 5g menta
            ['id_receta' => 18, 'id_ingrediente' => 5,  'cantidad' => 10],  // 10ml aceite de oliva

            // Shakshuka
            ['id_receta' => 19, 'id_ingrediente' => 4,  'cantidad' => 40],  // 40g cebolla
            ['id_receta' => 19, 'id_ingrediente' => 9,  'cantidad' => 40],  // 40g pimiento
            ['id_receta' => 19, 'id_ingrediente' => 7,  'cantidad' => 200], // 200g tomate
            ['id_receta' => 19, 'id_ingrediente' => 3,  'cantidad' => 2],   // 2 huevos
            ['id_receta' => 19, 'id_ingrediente' => 5,  'cantidad' => 10],  // 10ml aceite de oliva
        ]);
    }
}
