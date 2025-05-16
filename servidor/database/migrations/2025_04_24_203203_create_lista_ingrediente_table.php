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
        Schema::create('lista_ingrediente', function (Blueprint $table) {
            $table->unsignedBigInteger('id_lista');
            $table->unsignedBigInteger('id_ingrediente');
            $table->float('cantidad_total');
            $table->primary(['id_lista', 'id_ingrediente']);

            $table->foreign('id_lista')->references('id_lista')->on('lista_compra')->onDelete('cascade');
            $table->foreign('id_ingrediente')->references('id_ingrediente')->on('ingredientes')->onDelete('cascade');
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lista_ingrediente');
    }
};