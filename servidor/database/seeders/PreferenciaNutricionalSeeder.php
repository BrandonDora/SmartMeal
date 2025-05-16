<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PreferenciaNutricionalSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('preferencias_nutricionales')->insert([
            'user_id'        => 1,
            'calorias_deseadas'=> 2200,
        ]);
    }
}
