<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AlergenoSeeder::class,
            IngredienteSeeder::class,
            TiempoComidaSeeder::class,
            MenuSeeder::class,
            ListaCompraSeeder::class,
            PreferenciaNutricionalSeeder::class,
            CategoriaSeeder::class,
            RecetaSeeder::class,
            TiempoComidaRecetaSeeder::class,
            RecetaIngredienteSeeder::class,
            RecetaCategoriaSeeder::class,
            ActualizarMacrosRecetaSeeder::class,
        ]);
    }
}
