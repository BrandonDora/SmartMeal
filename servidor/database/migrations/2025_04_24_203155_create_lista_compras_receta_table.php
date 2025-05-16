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
        Schema::create('lista_compras_receta', function (Blueprint $table) {
            $table->unsignedBigInteger('id_lista');
            $table->unsignedBigInteger('id_receta');
            $table->primary(['id_lista', 'id_receta']);

            $table->foreign('id_lista')->references('id_lista')->on('lista_compra')->onDelete('cascade');
            $table->foreign('id_receta')->references('id_receta')->on('recetas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lista_compras_receta');
    }
};