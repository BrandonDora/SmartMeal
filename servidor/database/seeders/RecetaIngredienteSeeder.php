<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecetaIngredienteSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('receta_ingrediente')->insert([
            // Pollo a la plancha (id_receta: 1)
            ['id_receta' => 1,  'id_ingrediente' => 1,  'cantidad' => 1],   // Pechuga de pollo (1 unidad)
            ['id_receta' => 1,  'id_ingrediente' => 12, 'cantidad' => 10],  // Aceite de oliva (10 ml)

            // Tortilla de patatas (id_receta: 2)
            ['id_receta' => 2,  'id_ingrediente' => 4,  'cantidad' => 4],   // Huevo (4 unidades)
            ['id_receta' => 2,  'id_ingrediente' => 11, 'cantidad' => 2],   // Patata (2 unidades)
            ['id_receta' => 2,  'id_ingrediente' => 23, 'cantidad' => 1],   // Cebolla (1 unidad)
            ['id_receta' => 2,  'id_ingrediente' => 12, 'cantidad' => 30],  // Aceite de oliva (30 ml)

            // Salmón al horno (id_receta: 3)
            ['id_receta' => 3,  'id_ingrediente' => 13, 'cantidad' => 200], // Salmón (200 g)
            ['id_receta' => 3,  'id_ingrediente' => 12, 'cantidad' => 10],  // Aceite de oliva (10 ml)

            // Gazpacho (id_receta: 4)
            ['id_receta' => 4,  'id_ingrediente' => 8,  'cantidad' => 6],   // Tomate (6 unidades)
            ['id_receta' => 4,  'id_ingrediente' => 10, 'cantidad' => 1],   // Zanahoria (1 unidad)
            ['id_receta' => 4,  'id_ingrediente' => 23, 'cantidad' => 0.5], // Cebolla (½ unidad)
            ['id_receta' => 4,  'id_ingrediente' => 12, 'cantidad' => 30],  // Aceite de oliva (30 ml)

            // Paella mixta (id_receta: 5)
            ['id_receta' => 5,  'id_ingrediente' => 2,  'cantidad' => 200], // Arroz integral (200 g)
            ['id_receta' => 5,  'id_ingrediente' => 1,  'cantidad' => 1],   // Pechuga de pollo (1 unidad)
            ['id_receta' => 5,  'id_ingrediente' => 12, 'cantidad' => 30],  // Aceite de oliva (30 ml)
            ['id_receta' => 5,  'id_ingrediente' => 8,  'cantidad' => 2],   // Tomate (2 unidades)
            ['id_receta' => 5,  'id_ingrediente' => 23, 'cantidad' => 1],   // Cebolla (1 unidad)
            ['id_receta' => 5,  'id_ingrediente' => 10, 'cantidad' => 1],   // Zanahoria (1 unidad)

            // Spaghetti Bolognese (id_receta: 6)
            ['id_receta' => 6,  'id_ingrediente' => 6,  'cantidad' => 100], // Harina de trigo (100 g) as pasta
            ['id_receta' => 6,  'id_ingrediente' => 1,  'cantidad' => 100], // Pechuga de pollo (100 g) as meat
            ['id_receta' => 6,  'id_ingrediente' => 8,  'cantidad' => 2],   // Tomate (2 unidades)
            ['id_receta' => 6,  'id_ingrediente' => 23, 'cantidad' => 1],   // Cebolla (1 unidad)
            ['id_receta' => 6,  'id_ingrediente' => 10, 'cantidad' => 1],   // Zanahoria (1 unidad)
            ['id_receta' => 6,  'id_ingrediente' => 12, 'cantidad' => 20],  // Aceite de oliva (20 ml)

            // Smoothie de frutas (id_receta: 7)
            ['id_receta' => 7,  'id_ingrediente' => 18, 'cantidad' => 1],   // Plátano (1 unidad)
            ['id_receta' => 7,  'id_ingrediente' => 17, 'cantidad' => 1],   // Manzana (1 unidad)
            ['id_receta' => 7,  'id_ingrediente' => 19, 'cantidad' => 125], // Yogur natural (125 g)
            ['id_receta' => 7,  'id_ingrediente' => 7,  'cantidad' => 10],  // Azúcar (10 g)

            // Hamburguesa vegana (id_receta: 8)
            ['id_receta' => 8,  'id_ingrediente' => 15, 'cantidad' => 120], // Garbanzos cocidos (120 g)
            ['id_receta' => 8,  'id_ingrediente' => 20, 'cantidad' => 50],  // Avena (50 g) as binder
            ['id_receta' => 8,  'id_ingrediente' => 8,  'cantidad' => 1],   // Tomate (1 unidad)
            ['id_receta' => 8,  'id_ingrediente' => 9,  'cantidad' => 1],   // Lechuga (1 unidad)
            ['id_receta' => 8,  'id_ingrediente' => 10, 'cantidad' => 1],   // Zanahoria (1 unidad)
            ['id_receta' => 8,  'id_ingrediente' => 12, 'cantidad' => 10],  // Aceite de oliva (10 ml)

            // Arroz con leche (id_receta: 9)
            ['id_receta' => 9,  'id_ingrediente' => 2,  'cantidad' => 100], // Arroz integral (100 g)
            ['id_receta' => 9,  'id_ingrediente' => 5,  'cantidad' => 500], // Leche entera (500 ml)
            ['id_receta' => 9,  'id_ingrediente' => 7,  'cantidad' => 50],  // Azúcar (50 g)

            // Sándwich mixto (id_receta: 10)
            ['id_receta' => 10, 'id_ingrediente' => 6,  'cantidad' => 100], // Harina de trigo (100 g) as bread
            ['id_receta' => 10, 'id_ingrediente' => 21, 'cantidad' => 10],  // Mantequilla (10 g)
            ['id_receta' => 10, 'id_ingrediente' => 16, 'cantidad' => 20],  // Queso cheddar (20 g)

            // Yogur con granola (id_receta: 11)
            ['id_receta' => 11, 'id_ingrediente' => 19, 'cantidad' => 125], // Yogur natural (125 g)
            ['id_receta' => 11, 'id_ingrediente' => 20, 'cantidad' => 50],  // Avena (50 g) as granola
            ['id_receta' => 11, 'id_ingrediente' => 7,  'cantidad' => 10],  // Azúcar (10 g)

            // Ensalada de frutas (id_receta: 12)
            ['id_receta' => 12, 'id_ingrediente' => 17, 'cantidad' => 1],   // Manzana (1 unidad)
            ['id_receta' => 12, 'id_ingrediente' => 18, 'cantidad' => 1],   // Plátano (1 unidad)
            ['id_receta' => 12, 'id_ingrediente' => 7,  'cantidad' => 5],   // Azúcar (5 g) opcional

            // Omelette de queso (id_receta: 13)
            ['id_receta' => 13, 'id_ingrediente' => 4,  'cantidad' => 2],   // Huevo (2 unidades)
            ['id_receta' => 13, 'id_ingrediente' => 16, 'cantidad' => 50],  // Queso cheddar (50 g)
            ['id_receta' => 13, 'id_ingrediente' => 12, 'cantidad' => 10],  // Aceite de oliva (10 ml)

            // Smoothie verde (id_receta: 14)
            ['id_receta' => 14, 'id_ingrediente' => 22, 'cantidad' => 50],  // Espinacas (50 g)
            ['id_receta' => 14, 'id_ingrediente' => 18, 'cantidad' => 1],   // Plátano (1 unidad)
            ['id_receta' => 14, 'id_ingrediente' => 17, 'cantidad' => 1],   // Manzana (1 unidad)
            ['id_receta' => 14, 'id_ingrediente' => 5,  'cantidad' => 200], // Leche entera (200 ml)

            // Ensalada César (id_receta: 15)
            ['id_receta' => 15, 'id_ingrediente' => 9,  'cantidad' => 1],    // Lechuga (1 unidad)
            ['id_receta' => 15, 'id_ingrediente' => 1,  'cantidad' => 1],    // Pechuga de pollo (1 unidad)
            ['id_receta' => 15, 'id_ingrediente' => 16, 'cantidad' => 20],   // Queso cheddar (20 g) como parmesano
            ['id_receta' => 15, 'id_ingrediente' => 21, 'cantidad' => 10],   // Mantequilla (10 g) como crutones
            ['id_receta' => 15, 'id_ingrediente' => 12, 'cantidad' => 10],   // Aceite de oliva (10 ml)

            // Crema de calabaza (id_receta: 16)
            ['id_receta' => 16, 'id_ingrediente' => 24, 'cantidad' => 300],  // Calabaza (300 g)
            ['id_receta' => 16, 'id_ingrediente' => 11, 'cantidad' => 1],    // Patata (1 unidad)
            ['id_receta' => 16, 'id_ingrediente' => 10, 'cantidad' => 1],    // Zanahoria (1 unidad)
            ['id_receta' => 16, 'id_ingrediente' => 12, 'cantidad' => 10],   // Aceite de oliva (10 ml)

            // Pizza margarita (id_receta: 17)
            ['id_receta' => 17, 'id_ingrediente' => 6,  'cantidad' => 150],  // Harina de trigo (150 g) masa
            ['id_receta' => 17, 'id_ingrediente' => 8,  'cantidad' => 2],    // Tomate (2 unidades)
            ['id_receta' => 17, 'id_ingrediente' => 25, 'cantidad' => 80],   // Mozzarella (80 g)
            ['id_receta' => 17, 'id_ingrediente' => 26, 'cantidad' => 5],    // Albahaca (5 g)
            ['id_receta' => 17, 'id_ingrediente' => 12, 'cantidad' => 10],   // Aceite de oliva (10 ml)

            // Couscous de verduras (id_receta: 18)
            ['id_receta' => 18, 'id_ingrediente' => 27, 'cantidad' => 60],   // Couscous (60 g)
            ['id_receta' => 18, 'id_ingrediente' => 14, 'cantidad' => 50],   // Atún en lata (50 g) como proteína
            ['id_receta' => 18, 'id_ingrediente' => 28, 'cantidad' => 50],   // Calabacín (50 g)
            ['id_receta' => 18, 'id_ingrediente' => 10, 'cantidad' => 1],    // Zanahoria (1 unidad)
            ['id_receta' => 18, 'id_ingrediente' => 15, 'cantidad' => 50],   // Garbanzos cocidos (50 g)
            ['id_receta' => 18, 'id_ingrediente' => 12, 'cantidad' => 10],   // Aceite de oliva (10 ml)

            // Tarta de queso (id_receta: 19)
            ['id_receta' => 19, 'id_ingrediente' => 29, 'cantidad' => 200],  // Queso crema (200 g)
            ['id_receta' => 19, 'id_ingrediente' => 4,  'cantidad' => 2],    // Huevo (2 unidades)
            ['id_receta' => 19, 'id_ingrediente' => 7,  'cantidad' => 80],   // Azúcar (80 g)
            ['id_receta' => 19, 'id_ingrediente' => 30, 'cantidad' => 100],  // Galleta (100 g)
            ['id_receta' => 19, 'id_ingrediente' => 21, 'cantidad' => 40],   // Mantequilla (40 g)

            // Tabulé (id_receta: 20)
            ['id_receta' => 20, 'id_ingrediente' => 27, 'cantidad' => 60],   // Couscous (60 g)
            ['id_receta' => 20, 'id_ingrediente' => 8,  'cantidad' => 1],    // Tomate (1 unidad)
            ['id_receta' => 20, 'id_ingrediente' => 31, 'cantidad' => 50],   // Pepino (50 g)
            ['id_receta' => 20, 'id_ingrediente' => 32, 'cantidad' => 10],   // Perejil (10 g)
            ['id_receta' => 20, 'id_ingrediente' => 33, 'cantidad' => 10],   // Zumo de limón (10 ml)
            ['id_receta' => 20, 'id_ingrediente' => 12, 'cantidad' => 10],   // Aceite de oliva (10 ml)

            // Crepe de jamón y queso (id_receta: 21)
            ['id_receta' => 21, 'id_ingrediente' => 6,  'cantidad' => 50],   // Harina de trigo (50 g)
            ['id_receta' => 21, 'id_ingrediente' => 4,  'cantidad' => 1],    // Huevo (1 unidad)
            ['id_receta' => 21, 'id_ingrediente' => 34, 'cantidad' => 50],   // Jamón cocido (50 g)
            ['id_receta' => 21, 'id_ingrediente' => 16, 'cantidad' => 30],   // Queso cheddar (30 g)
            ['id_receta' => 21, 'id_ingrediente' => 21, 'cantidad' => 10],   // Mantequilla (10 g)
        ]);
    }
}
