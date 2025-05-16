<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TiempoComida extends Model
{
    protected $table = 'tiempo_comida';
    protected $primaryKey = 'id_tipo';
    public $timestamps = false;

    public function recetas()
    {
        return $this->belongsToMany(Receta::class, 'receta_tiempo_comida', 'id_tipo', 'id_receta');
    }
}