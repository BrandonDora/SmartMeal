<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            userseeder::class,
            AlergenoSeeder::class,
            IngredienteSeeder::class,
            TiempoComidaSeeder::class,
            RecetaSeeder::class,
            MenuSeeder::class,
            ListaCompraSeeder::class,
            PreferenciaNutricionalSeeder::class,
        ]);
    }
}
