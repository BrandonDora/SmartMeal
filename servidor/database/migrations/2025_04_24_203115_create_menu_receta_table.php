<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menu_receta', function (Blueprint $table) {
            $table->unsignedBigInteger('id_menu');
            $table->unsignedBigInteger('id_receta');
            $table->primary(['id_menu', 'id_receta']);

            // Claves foráneas
            $table->foreign('id_menu')->references('id_menu')->on('menus')->onDelete('cascade');
            $table->foreign('id_receta')->references('id_receta')->on('recetas')->onDelete('cascade');
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_receta');
    }
};