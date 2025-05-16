<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TiempoComidaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tiempo_comida')->insert([
            ['nombre' => 'Desayuno'],
            ['nombre' => 'Almuerzo'],
            ['nombre' => 'Cena'],
        ]);
    }
}