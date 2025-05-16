<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'usuario' => 'Brandon_17',
            'nombre'  => 'Brandon',
            'email'   => 'brandon@email.com',
            'password'=> '12345',
        ]);

        \App\Models\User::factory()->count(5)->create();
    }
}
