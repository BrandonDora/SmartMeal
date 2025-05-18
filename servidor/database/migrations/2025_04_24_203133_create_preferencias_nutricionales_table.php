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
        Schema::create('preferencias_nutricionales', function (Blueprint $table) {
            $table->id('id_preferencia');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->integer('calorias_deseadas');
            $table->string('objetivo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preferencias_nutricionales');
    }
};