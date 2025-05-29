<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IngredienteSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ingredientes')->insert([
            [
                'nombre'        => 'Pechuga de pollo',
                'unidad'        => 'unidad',
                'calorias'      => 165,    // por unidad (≈150 g)
                'proteinas'     => 31,
                'grasas'        => 3.6,
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Arroz integral',
                'unidad'        => 'gramos',
                'calorias'      => 3.64,   // por g
                'proteinas'     => 0.026,
                'grasas'        => 0.009,
                'carbohidratos' => 0.23,
            ],
            [
                'nombre'        => 'Brócoli',
                'unidad'        => 'unidad',
                'calorias'      => 34,     // por unidad (≈100 g)
                'proteinas'     => 2.8,
                'grasas'        => 0.4,
                'carbohidratos' => 7,
            ],
            [
                'nombre'        => 'Huevo',
                'unidad'        => 'unidad',
                'calorias'      => 72,
                'proteinas'     => 6.3,
                'grasas'        => 5.0,
                'carbohidratos' => 0.4,
            ],
            [
                'nombre'        => 'Leche entera',
                'unidad'        => 'ml',
                'calorias'      => 0.61,   // por ml
                'proteinas'     => 0.032,
                'grasas'        => 0.033,
                'carbohidratos' => 0.048,
            ],
            [
                'nombre'        => 'Harina de trigo',
                'unidad'        => 'gramos',
                'calorias'      => 3.64,
                'proteinas'     => 0.10,
                'grasas'        => 0.01,
                'carbohidratos' => 0.76,
            ],
            [
                'nombre'        => 'Azúcar',
                'unidad'        => 'gramos',
                'calorias'      => 3.87,
                'proteinas'     => 0,
                'grasas'        => 0,
                'carbohidratos' => 1.00,
            ],
            [
                'nombre'        => 'Tomate',
                'unidad'        => 'unidad',
                'calorias'      => 22,     // por unidad (≈100 g)
                'proteinas'     => 1.1,
                'grasas'        => 0.2,
                'carbohidratos' => 4.8,
            ],
            [
                'nombre'        => 'Lechuga',
                'unidad'        => 'unidad',
                'calorias'      => 15,     // por unidad (hoja grande o cogollo)
                'proteinas'     => 1.4,
                'grasas'        => 0.2,
                'carbohidratos' => 2.9,
            ],
            [
                'nombre'        => 'Zanahoria',
                'unidad'        => 'unidad',
                'calorias'      => 25,     // por unidad (≈60 g)
                'proteinas'     => 0.6,
                'grasas'        => 0.1,
                'carbohidratos' => 6,
            ],
            [
                'nombre'        => 'Patata',
                'unidad'        => 'unidad',
                'calorias'      => 77,     // por unidad (≈100 g)
                'proteinas'     => 2,
                'grasas'        => 0.1,
                'carbohidratos' => 17,
            ],
            [
                'nombre'        => 'Aceite de oliva',
                'unidad'        => 'ml',
                'calorias'      => 8.84,   // por ml (≈884 cal/100 ml)
                'proteinas'     => 0,
                'grasas'        => 1.00,   // ≈1 g grasa por ml
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Salmón',
                'unidad'        => 'gramos',
                'calorias'      => 2.08,
                'proteinas'     => 0.20,
                'grasas'        => 0.13,
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Atún en lata',
                'unidad'        => 'gramos',
                'calorias'      => 1.16,
                'proteinas'     => 0.26,
                'grasas'        => 0.01,
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Garbanzos cocidos',
                'unidad'        => 'gramos',
                'calorias'      => 1.64,
                'proteinas'     => 0.09,
                'grasas'        => 0.026,
                'carbohidratos' => 0.274,
            ],
            [
                'nombre'        => 'Queso cheddar',
                'unidad'        => 'gramos',
                'calorias'      => 4.03,
                'proteinas'     => 0.25,
                'grasas'        => 0.33,
                'carbohidratos' => 0.013,
            ],
            [
                'nombre'        => 'Manzana',
                'unidad'        => 'unidad',
                'calorias'      => 95,
                'proteinas'     => 0.5,
                'grasas'        => 0.3,
                'carbohidratos' => 25,
            ],
            [
                'nombre'        => 'Plátano',
                'unidad'        => 'unidad',
                'calorias'      => 105,
                'proteinas'     => 1.3,
                'grasas'        => 0.4,
                'carbohidratos' => 27,
            ],
            [
                'nombre'        => 'Yogur natural',
                'unidad'        => 'gramos',
                'calorias'      => 0.59,
                'proteinas'     => 0.10,
                'grasas'        => 0.004,
                'carbohidratos' => 0.04,
            ],
            [
                'nombre'        => 'Avena',
                'unidad'        => 'gramos',
                'calorias'      => 3.89,
                'proteinas'     => 0.17,
                'grasas'        => 0.07,
                'carbohidratos' => 0.66,
            ],
            [
                'nombre'        => 'Mantequilla',
                'unidad'        => 'gramos',
                'calorias'      => 7.17,
                'proteinas'     => 0.005,
                'grasas'        => 0.81,
                'carbohidratos' => 0.001,
            ],
            [
                'nombre'        => 'Espinacas',
                'unidad'        => 'gramos',
                'calorias'      => 0.23,
                'proteinas'     => 0.029,
                'grasas'        => 0.004,
                'carbohidratos' => 0.036,
            ],
            [
                'nombre'        => 'Cebolla',
                'unidad'        => 'unidad',
                'calorias'      => 44,
                'proteinas'     => 1.2,
                'grasas'        => 0.1,
                'carbohidratos' => 10,
            ],
            [
                'nombre'        => 'Pasta integral',
                'unidad'        => 'gramos',
                'calorias'      => 3.5,
                'proteinas'     => 0.12,
                'grasas'        => 0.013,
                'carbohidratos' => 0.74,
            ],
            [
                'nombre'        => 'Lentejas cocidas',
                'unidad'        => 'gramos',
                'calorias'      => 1.16,
                'proteinas'     => 0.09,
                'grasas'        => 0.004,
                'carbohidratos' => 0.20,
            ],
            [
                'nombre'        => 'Pimiento rojo',
                'unidad'        => 'unidad',
                'calorias'      => 31,
                'proteinas'     => 1.0,
                'grasas'        => 0.3,
                'carbohidratos' => 6,
            ],
            [
                'nombre'        => 'Calabacín',
                'unidad'        => 'unidad',
                'calorias'      => 33,
                'proteinas'     => 2.4,
                'grasas'        => 0.6,
                'carbohidratos' => 6.1,
            ],
            [
                'nombre'        => 'Pera',
                'unidad'        => 'unidad',
                'calorias'      => 57,
                'proteinas'     => 0.4,
                'grasas'        => 0.1,
                'carbohidratos' => 15,
            ],
            [
                'nombre'        => 'Naranja',
                'unidad'        => 'unidad',
                'calorias'      => 62,
                'proteinas'     => 1.2,
                'grasas'        => 0.2,
                'carbohidratos' => 15.4,
            ],
            [
                'nombre'        => 'Almendras',
                'unidad'        => 'gramos',
                'calorias'      => 5.76,
                'proteinas'     => 0.21,
                'grasas'        => 0.50,
                'carbohidratos' => 0.22,
            ],
            [
                'nombre'        => 'Nueces',
                'unidad'        => 'gramos',
                'calorias'      => 6.54,
                'proteinas'     => 0.15,
                'grasas'        => 0.65,
                'carbohidratos' => 0.14,
            ],
            [
                'nombre'        => 'Pan integral',
                'unidad'        => 'gramos',
                'calorias'      => 2.5,
                'proteinas'     => 0.09,
                'grasas'        => 0.03,
                'carbohidratos' => 0.47,
            ],
            [
                'nombre'        => 'Jamón cocido',
                'unidad'        => 'gramos',
                'calorias'      => 1.13,
                'proteinas'     => 0.19,
                'grasas'        => 0.03,
                'carbohidratos' => 0.01,
            ],
            [
                'nombre'        => 'Pavo',
                'unidad'        => 'gramos',
                'calorias'      => 1.04,
                'proteinas'     => 0.22,
                'grasas'        => 0.01,
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Merluza',
                'unidad'        => 'gramos',
                'calorias'      => 0.82,
                'proteinas'     => 0.18,
                'grasas'        => 0.01,
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Galleta María',
                'unidad'        => 'unidad',
                'calorias'      => 28,
                'proteinas'     => 0.5,
                'grasas'        => 1.0,
                'carbohidratos' => 5.2,
            ],
            [
                'nombre'        => 'Chocolate negro',
                'unidad'        => 'gramos',
                'calorias'      => 5.46,
                'proteinas'     => 0.05,
                'grasas'        => 0.32,
                'carbohidratos' => 0.61,
            ],
            [
                'nombre'        => 'Miel',
                'unidad'        => 'gramos',
                'calorias'      => 3.04,
                'proteinas'     => 0.003,
                'grasas'        => 0,
                'carbohidratos' => 0.82,
            ],
            [
                'nombre'        => 'Agua',
                'unidad'        => 'ml',
                'calorias'      => 0,
                'proteinas'     => 0,
                'grasas'        => 0,
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Cerveza',
                'unidad'        => 'ml',
                'calorias'      => 0.43,
                'proteinas'     => 0.004,
                'grasas'        => 0,
                'carbohidratos' => 0.03,
            ],
            [
                'nombre'        => 'Vino tinto',
                'unidad'        => 'ml',
                'calorias'      => 0.85,
                'proteinas'     => 0,
                'grasas'        => 0,
                'carbohidratos' => 0.027,
            ],
            [
                'nombre'        => 'Queso fresco',
                'unidad'        => 'gramos',
                'calorias'      => 1.45,
                'proteinas'     => 0.10,
                'grasas'        => 0.08,
                'carbohidratos' => 0.03,
            ],
            [
                'nombre'        => 'Tofu',
                'unidad'        => 'gramos',
                'calorias'      => 0.76,
                'proteinas'     => 0.08,
                'grasas'        => 0.048,
                'carbohidratos' => 0.015,
            ],
            [
                'nombre'        => 'Pepino',
                'unidad'        => 'unidad',
                'calorias'      => 16,
                'proteinas'     => 0.7,
                'grasas'        => 0.1,
                'carbohidratos' => 3.6,
            ],
            [
                'nombre'        => 'Caldo de pollo',
                'unidad'        => 'ml',
                'calorias'      => 0.05,
                'proteinas'     => 0.008,
                'grasas'        => 0.002,
                'carbohidratos' => 0.004,
            ],
            [
                'nombre'        => 'Calabaza',
                'unidad'        => 'gramos',
                'calorias'      => 0.26,
                'proteinas'     => 0.01,
                'grasas'        => 0.001,
                'carbohidratos' => 0.065,
            ],
            [
                'nombre'        => 'Mozzarella',
                'unidad'        => 'gramos',
                'calorias'      => 2.8,
                'proteinas'     => 0.18,
                'grasas'        => 0.17,
                'carbohidratos' => 0.013,
            ],
            [
                'nombre'        => 'Albahaca',
                'unidad'        => 'gramos',
                'calorias'      => 2.3,
                'proteinas'     => 0.032,
                'grasas'        => 0.006,
                'carbohidratos' => 0.048,
            ],
            [
                'nombre'        => 'Couscous',
                'unidad'        => 'gramos',
                'calorias'      => 3.76,
                'proteinas'     => 0.13,
                'grasas'        => 0.006,
                'carbohidratos' => 0.77,
            ],
            [
                'nombre'        => 'Calabacín',
                'unidad'        => 'gramos',
                'calorias'      => 0.17,
                'proteinas'     => 0.012,
                'grasas'        => 0.002,
                'carbohidratos' => 0.03,
            ],
            [
                'nombre'        => 'Queso crema',
                'unidad'        => 'gramos',
                'calorias'      => 3.42,
                'proteinas'     => 0.06,
                'grasas'        => 0.34,
                'carbohidratos' => 0.04,
            ],
            [
                'nombre'        => 'Galleta',
                'unidad'        => 'gramos',
                'calorias'      => 4.8,
                'proteinas'     => 0.07,
                'grasas'        => 0.18,
                'carbohidratos' => 0.72,
            ],
            [
                'nombre'        => 'Pepino',
                'unidad'        => 'gramos',
                'calorias'      => 0.16,
                'proteinas'     => 0.007,
                'grasas'        => 0.001,
                'carbohidratos' => 0.036,
            ],
            [
                'nombre'        => 'Perejil',
                'unidad'        => 'gramos',
                'calorias'      => 0.36,
                'proteinas'     => 0.03,
                'grasas'        => 0.008,
                'carbohidratos' => 0.06,
            ],
            [
                'nombre'        => 'Zumo de limón',
                'unidad'        => 'ml',
                'calorias'      => 0.22,
                'proteinas'     => 0.004,
                'grasas'        => 0.001,
                'carbohidratos' => 0.07,
            ],
            [
                'nombre'        => 'Jamón cocido',
                'unidad'        => 'gramos',
                'calorias'      => 1.13,
                'proteinas'     => 0.19,
                'grasas'        => 0.03,
                'carbohidratos' => 0.01,
            ],
                        [
                'nombre'        => 'Pechuga de pollo',
                'unidad'        => 'unidad',
                'calorias'      => 165,    // 1 unidad ≈ 150 g
                'proteinas'     => 31,
                'grasas'        => 3.6,
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Arroz integral',
                'unidad'        => 'gramos',
                'calorias'      => 3.64,   // por g
                'proteinas'     => 0.026,
                'grasas'        => 0.009,
                'carbohidratos' => 0.23,
            ],
            [
                'nombre'        => 'Brócoli',
                'unidad'        => 'unidad',      // 1 ramillete ≈ 150 g
                'calorias'      => 51,            // 34 cal/100 g × 1.5
                'proteinas'     => 4.2,           // 2.8 g/100 g × 1.5
                'grasas'        => 0.6,           // 0.4 g/100 g × 1.5
                'carbohidratos' => 10.5,          // 7 g/100 g × 1.5
            ],
            [
                'nombre'        => 'Huevo',
                'unidad'        => 'unidad',
                'calorias'      => 72,
                'proteinas'     => 6.3,
                'grasas'        => 5.0,
                'carbohidratos' => 0.4,
            ],
            [
                'nombre'        => 'Leche entera',
                'unidad'        => 'ml',
                'calorias'      => 0.61,   // por ml
                'proteinas'     => 0.032,
                'grasas'        => 0.033,
                'carbohidratos' => 0.048,
            ],
            [
                'nombre'        => 'Harina de trigo',
                'unidad'        => 'gramos',
                'calorias'      => 3.64,
                'proteinas'     => 0.10,
                'grasas'        => 0.01,
                'carbohidratos' => 0.76,
            ],
            [
                'nombre'        => 'Azúcar',
                'unidad'        => 'gramos',
                'calorias'      => 3.87,
                'proteinas'     => 0,
                'grasas'        => 0,
                'carbohidratos' => 1.00,
            ],
            [
                'nombre'        => 'Tomate',
                'unidad'        => 'unidad',      // 1 tomate mediano ≈ 123 g
                'calorias'      => 27,            // 22 cal/100 g × 1.23
                'proteinas'     => 1.4,           // 1.1 g/100 g × 1.23
                'grasas'        => 0.2,
                'carbohidratos' => 5.9,           // 4.8 g/100 g × 1.23
            ],
            [
                'nombre'        => 'Lechuga',
                'unidad'        => 'unidad',      // 1 cogollo ≈ 600 g
                'calorias'      => 90,            // 15 cal/100 g × 6
                'proteinas'     => 8.4,           // 1.4 g/100 g × 6
                'grasas'        => 1.2,           // 0.2 g/100 g × 6
                'carbohidratos' => 17.4,          // 2.9 g/100 g × 6
            ],
            [
                'nombre'        => 'Zanahoria',
                'unidad'        => 'unidad',      // 1 mediana ≈ 61 g
                'calorias'      => 25,            // típico calorías por unidad
                'proteinas'     => 1.0,           // aproximado
                'grasas'        => 0.1,
                'carbohidratos' => 6,
            ],
            [
                'nombre'        => 'Patata',
                'unidad'        => 'unidad',      // 1 mediana ≈ 150 g
                'calorias'      => 115,           // 77 cal/100 g × 1.5
                'proteinas'     => 3.0,           // 2 g/100 g × 1.5
                'grasas'        => 0.2,           // 0.1 g/100 g × 1.5
                'carbohidratos' => 25.5,          // 17 g/100 g × 1.5
            ],
            [
                'nombre'        => 'Aceite de oliva',
                'unidad'        => 'ml',
                'calorias'      => 8.84,   // por ml
                'proteinas'     => 0,
                'grasas'        => 1.00,   // ≈1 g de grasa por ml
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Salmón',
                'unidad'        => 'gramos',
                'calorias'      => 2.08,
                'proteinas'     => 0.20,
                'grasas'        => 0.13,
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Atún en lata',
                'unidad'        => 'gramos',
                'calorias'      => 1.16,
                'proteinas'     => 0.26,
                'grasas'        => 0.01,
                'carbohidratos' => 0,
            ],
            [
                'nombre'        => 'Garbanzos cocidos',
                'unidad'        => 'gramos',
                'calorias'      => 1.64,
                'proteinas'     => 0.09,
                'grasas'        => 0.026,
                'carbohidratos' => 0.274,
            ],
            [
                'nombre'        => 'Queso cheddar',
                'unidad'        => 'gramos',
                'calorias'      => 4.03,
                'proteinas'     => 0.25,
                'grasas'        => 0.33,
                'carbohidratos' => 0.013,
            ],
            [
                'nombre'        => 'Manzana',
                'unidad'        => 'unidad',      // 1 mediana ≈ 182 g
                'calorias'      => 95,
                'proteinas'     => 0.5,
                'grasas'        => 0.3,
                'carbohidratos' => 25,
            ],
            [
                'nombre'        => 'Plátano',
                'unidad'        => 'unidad',      // 1 mediano ≈ 118 g
                'calorias'      => 105,
                'proteinas'     => 1.3,
                'grasas'        => 0.4,
                'carbohidratos' => 27,
            ],
            [
                'nombre'        => 'Yogur natural',
                'unidad'        => 'gramos',
                'calorias'      => 0.59,
                'proteinas'     => 0.10,
                'grasas'        => 0.004,
                'carbohidratos' => 0.04,
            ],
            [
                'nombre'        => 'Avena',
                'unidad'        => 'gramos',
                'calorias'      => 3.89,
                'proteinas'     => 0.17,
                'grasas'        => 0.07,
                'carbohidratos' => 0.66,
            ],
            [
                'nombre'        => 'Mantequilla',
                'unidad'        => 'gramos',
                'calorias'      => 7.17,
                'proteinas'     => 0.005,
                'grasas'        => 0.81,
                'carbohidratos' => 0.001,
            ],
            [
                'nombre'        => 'Espinacas',
                'unidad'        => 'gramos',
                'calorias'      => 0.23,
                'proteinas'     => 0.029,
                'grasas'        => 0.004,
                'carbohidratos' => 0.036,
            ],
            [
                'nombre'        => 'Cebolla',
                'unidad'        => 'unidad',      // 1 mediana ≈ 110 g
                'calorias'      => 48,            // 44 cal/100 g × 1.1
                'proteinas'     => 1.3,           // 1.2 g/100 g × 1.1
                'grasas'        => 0.1,
                'carbohidratos' => 11,            // 10 g/100 g × 1.1
            ],
        ]);
    }
}
