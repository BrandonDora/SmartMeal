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
        Schema::create('receta_tiempo_comida', function (Blueprint $table) {
            $table->foreignId('id_receta')
                ->constrained('recetas', 'id_receta')
                ->onDelete('cascade');
            $table->foreignId('id_tipo')
                ->constrained('tiempo_comida', 'id_tipo')
                ->onDelete('cascade');
            $table->primary(['id_receta', 'id_tipo']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receta_tiempo_comida');
    }
};
