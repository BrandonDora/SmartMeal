<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IngredienteSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ingredientes')->insert([
            // Ingredientes para las 14 recetas
            [
                'nombre'        => 'Pechuga de pollo',
                'unidad'        => 'gramos',
                'calorias'      => 1.65,   // por gramo (165 kcal/100g)
                'proteinas'     => 0.31,   // por gramo (31g/100g)
                'grasas'        => 0.036,  // por gramo (3.6g/100g)
                'carbohidratos' => 0,      // por gramo
            ],
            [
                'nombre'        => 'Patata',
                'unidad'        => 'gramos',
                'calorias'      => 0.77,   // por gramo (77 kcal/100g)
                'proteinas'     => 0.02,   // por gramo (2g/100g)
                'grasas'        => 0.001,  // por gramo (0.1g/100g)
                'carbohidratos' => 0.17,   // por gramo (17g/100g)
            ],
            [
                'nombre'        => 'Huevo',
                'unidad'        => 'unidad',
                'calorias'      => 72,     // por unidad (mediano)
                'proteinas'     => 6.3,
                'grasas'        => 5.0,
                'carbohidratos' => 0.4,
            ],
            [
                'nombre'        => 'Cebolla',
                'unidad'        => 'gramos',
                'calorias'      => 0.4,    // por gramo (40 kcal/100g)
                'proteinas'     => 0.011,  // por gramo (1.1g/100g)
                'grasas'        => 0.001,  // por gramo (0.1g/100g)
                'carbohidratos' => 0.09,   // por gramo (9g/100g)
            ],
            [
                'nombre'        => 'Aceite de oliva',
                'unidad'        => 'ml',
                'calorias'      => 8.84,   // por ml (884 kcal/100ml)
                'proteinas'     => 0,
                'grasas'        => 1.0,    // por ml (1g/ml)
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Salmón',
                'unidad'        => 'gramos',
                'calorias'      => 2.08,   // por gramo (208 kcal/100g)
                'proteinas'     => 0.20,   // por gramo (20g/100g)
                'grasas'        => 0.13,   // por gramo (13g/100g)
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Arroz',
                'unidad'        => 'gramos',
                'calorias'      => 1.3,    // por gramo (130 kcal/100g cocido)
                'proteinas'     => 0.025,  // por gramo (2.5g/100g)
                'grasas'        => 0.002,  // por gramo (0.2g/100g)
                'carbohidratos' => 0.28,   // por gramo (28g/100g)
            ],
            [
                'nombre'        => 'Tomate',
                'unidad'        => 'gramos',
                'calorias'      => 0.18,   // por gramo (18 kcal/100g)
                'proteinas'     => 0.009,  // por gramo (0.9g/100g)
                'grasas'        => 0.002,  // por gramo (0.2g/100g)
                'carbohidratos' => 0.039,  // por gramo (3.9g/100g)
            ],
            [
                'nombre'        => 'Pepino',
                'unidad'        => 'gramos',
                'calorias'      => 0.16,   // por gramo (16 kcal/100g)
                'proteinas'     => 0.006,  // por gramo (0.6g/100g)
                'grasas'        => 0.001,  // por gramo (0.1g/100g)
                'carbohidratos' => 0.036,  // por gramo (3.6g/100g)
            ],
            [
                'nombre'        => 'Pimiento',
                'unidad'        => 'gramos',
                'calorias'      => 0.31,   // por gramo (31 kcal/100g)
                'proteinas'     => 0.01,   // por gramo (1g/100g)
                'grasas'        => 0.003,  // por gramo (0.3g/100g)
                'carbohidratos' => 0.06,   // por gramo (6g/100g)
            ],
            [
                'nombre'        => 'Carne picada de ternera',
                'unidad'        => 'gramos',
                'calorias'      => 2.5,    // por gramo (250 kcal/100g)
                'proteinas'     => 0.26,   // por gramo (26g/100g)
                'grasas'        => 0.20,   // por gramo (20g/100g)
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Pasta',
                'unidad'        => 'gramos',
                'calorias'      => 1.3,    // por gramo (130 kcal/100g cocida)
                'proteinas'     => 0.05,   // por gramo (5g/100g)
                'grasas'        => 0.01,   // por gramo (1g/100g)
                'carbohidratos' => 0.25,   // por gramo (25g/100g)
            ],
            [
                'nombre'        => 'Plátano',
                'unidad'        => 'gramos',
                'calorias'      => 0.89,   // por gramo (89 kcal/100g)
                'proteinas'     => 0.011,  // por gramo (1.1g/100g)
                'grasas'        => 0.003,  // por gramo (0.3g/100g)
                'carbohidratos' => 0.23,   // por gramo (23g/100g)
            ],
            [
                'nombre'        => 'Frutos rojos',
                'unidad'        => 'gramos',
                'calorias'      => 0.5,    // por gramo (50 kcal/100g)
                'proteinas'     => 0.007,  // por gramo (0.7g/100g)
                'grasas'        => 0.002,  // por gramo (0.2g/100g)
                'carbohidratos' => 0.12,   // por gramo (12g/100g)
            ],
            [
                'nombre'        => 'Yogur',
                'unidad'        => 'gramos',
                'calorias'      => 0.59,   // por gramo (59 kcal/100g)
                'proteinas'     => 0.10,   // por gramo (10g/100g)
                'grasas'        => 0.034,  // por gramo (3.4g/100g)
                'carbohidratos' => 0.045,  // por gramo (4.5g/100g)
            ],
            [
                'nombre'        => 'Quinoa',
                'unidad'        => 'gramos',
                'calorias'      => 1.2,    // por gramo (120 kcal/100g cocida)
                'proteinas'     => 0.04,   // por gramo (4g/100g)
                'grasas'        => 0.02,   // por gramo (2g/100g)
                'carbohidratos' => 0.21,   // por gramo (21g/100g)
            ],
            [
                'nombre'        => 'Garbanzos cocidos',
                'unidad'        => 'gramos',
                'calorias'      => 1.64,   // por gramo (164 kcal/100g)
                'proteinas'     => 0.09,   // por gramo (9g/100g)
                'grasas'        => 0.026,  // por gramo (2.6g/100g)
                'carbohidratos' => 0.274,  // por gramo (27.4g/100g)
            ],
            [
                'nombre'        => 'Manzana',
                'unidad'        => 'gramos',
                'calorias'      => 0.52,   // por gramo (52 kcal/100g)
                'proteinas'     => 0.003,  // por gramo (0.3g/100g)
                'grasas'        => 0.001,  // por gramo (0.1g/100g)
                'carbohidratos' => 0.14,   // por gramo (14g/100g)
            ],
            [
                'nombre'        => 'Fresa',
                'unidad'        => 'gramos',
                'calorias'      => 0.32,   // por gramo (32 kcal/100g)
                'proteinas'     => 0.006,  // por gramo (0.6g/100g)
                'grasas'        => 0.003,  // por gramo (0.3g/100g)
                'carbohidratos' => 0.08,   // por gramo (8g/100g)
            ],
            [
                'nombre'        => 'Uva',
                'unidad'        => 'gramos',
                'calorias'      => 0.69,   // por gramo (69 kcal/100g)
                'proteinas'     => 0.007,  // por gramo (0.7g/100g)
                'grasas'        => 0.001,  // por gramo (0.1g/100g)
                'carbohidratos' => 0.18,   // por gramo (18g/100g)
            ],
            [
                'nombre'        => 'Queso',
                'unidad'        => 'gramos',
                'calorias'      => 4.02,   // por gramo (402 kcal/100g)
                'proteinas'     => 0.25,   // por gramo (25g/100g)
                'grasas'        => 0.33,   // por gramo (33g/100g)
                'carbohidratos' => 0.013,  // por gramo (1.3g/100g)
            ],
            [
                'nombre'        => 'Espinaca',
                'unidad'        => 'gramos',
                'calorias'      => 0.23,   // por gramo (23 kcal/100g)
                'proteinas'     => 0.029,  // por gramo (2.9g/100g)
                'grasas'        => 0.004,  // por gramo (0.4g/100g)
                'carbohidratos' => 0.036,  // por gramo (3.6g/100g)
            ],
        ]);
    }
}
