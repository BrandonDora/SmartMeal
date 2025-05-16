<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $menuId = DB::table('menus')->insertGetId([
            'nombre'   => 'Plan diario de ejemplo',
            'user_id'  => 1,
        ]);

        DB::table('menu_receta')->insert([
            ['id_menu' => $menuId, 'id_receta' => 1],
            ['id_menu' => $menuId, 'id_receta' => 2],
        ]);
    }
}
