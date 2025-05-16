<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alergeno extends Model
{
    protected $table = 'alergenos';
    protected $primaryKey = 'id_alergeno';
    public $timestamps = false;

    public function ingredientes()
    {
        return $this->hasMany(Ingrediente::class, 'id_alergeno');
    }
}