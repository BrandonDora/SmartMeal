<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AlergenoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('alergenos')->insert([
            ['nombre' => 'Gluten'],
            ['nombre' => 'Lactosa'],
            ['nombre' => 'Frutos secos'],
            ['nombre' => 'Soja'],
            ['nombre' => 'Huevos'],
            ['nombre' => 'Marisco'],
            ['nombre' => 'No Halal'],
            ['nombre' => 'No Vegetariano'],
        ]);
    }
}
