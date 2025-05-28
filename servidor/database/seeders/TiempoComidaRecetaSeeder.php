<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TiempoComidaRecetaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('receta_tiempo_comida')->insert([
            // Pollo a la plancha: almuerzo y cena
            ['id_receta' => 1,  'id_tipo' => 2],
            ['id_receta' => 1,  'id_tipo' => 3],

            // Tortilla de patatas: desayuno, almuerzo y cena
            ['id_receta' => 2,  'id_tipo' => 2],
            ['id_receta' => 2,  'id_tipo' => 3],

            // Salmón al horno: almuerzo y cena
            ['id_receta' => 3,  'id_tipo' => 2],
            ['id_receta' => 3,  'id_tipo' => 3],

            // Gazpacho: almuerzo y cena
            ['id_receta' => 4,  'id_tipo' => 2],
            ['id_receta' => 4,  'id_tipo' => 3],

            // Paella mixta: almuerzo
            ['id_receta' => 5,  'id_tipo' => 2],

            // Spaghetti Bolognese: almuerzo y cena
            ['id_receta' => 6,  'id_tipo' => 2],
            ['id_receta' => 6,  'id_tipo' => 3],

            // Smoothie de frutas: desayuno
            ['id_receta' => 7,  'id_tipo' => 1],

            // Hamburguesa vegana: almuerzo y cena
            ['id_receta' => 8,  'id_tipo' => 2],
            ['id_receta' => 8,  'id_tipo' => 3],

            // Arroz con leche: desayuno y cena (postre)
            ['id_receta' => 9,  'id_tipo' => 1],
            ['id_receta' => 9,  'id_tipo' => 3],

            // Sándwich mixto: desayuno y almuerzo
            ['id_receta' => 10, 'id_tipo' => 1],
            ['id_receta' => 10, 'id_tipo' => 2],

            // Yogur con granola: desayuno
            ['id_receta' => 11, 'id_tipo' => 1],

            // Ensalada de frutas: desayuno, almuerzo y cena (ligera)
            ['id_receta' => 12, 'id_tipo' => 1],
            ['id_receta' => 12, 'id_tipo' => 2],
            ['id_receta' => 12, 'id_tipo' => 3],

            // Omelette de queso: desayuno y cena
            ['id_receta' => 13, 'id_tipo' => 1],
            ['id_receta' => 13, 'id_tipo' => 3],

            // Smoothie verde: desayuno
            ['id_receta' => 14, 'id_tipo' => 1],
        ]);
    }
}
