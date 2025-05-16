<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingrediente extends Model
{
    protected $table = 'ingredientes';
    protected $primaryKey = 'id_ingrediente';
    public $timestamps = false;

    public function recetas()
    {
        return $this->belongsToMany(Receta::class, 'receta_ingrediente', 'id_ingrediente', 'id_receta')
                    ->withPivot('cantidad');
    }

    public function alergeno()
    {
        return $this->belongsTo(Alergeno::class, 'id_alergeno');
    }
}
