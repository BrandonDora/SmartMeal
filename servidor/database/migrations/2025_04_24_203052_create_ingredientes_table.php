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
        Schema::create('ingredientes', function (Blueprint $table) {
            $table->id('id_ingrediente');
            $table->string('nombre');
            $table->string('unidad')->nullable();
            $table->float('calorias')->nullable();
            $table->float('proteinas')->nullable();
            $table->float('grasas')->nullable();
            $table->float('carbohidratos')->nullable();
            $table->unsignedBigInteger('id_alergeno')->nullable();
            $table->foreign('id_alergeno')->references('id_alergeno')->on('alergenos')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingredientes');
    }
};
