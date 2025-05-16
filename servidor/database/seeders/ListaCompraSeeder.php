<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ListaCompra;

class ListaCompraSeeder extends Seeder
{
    public function run()
    {
        ListaCompra::create([
            'nombre' => 'Compra Semana 1',
            'user_id' => 1
        ]);
    }
}
