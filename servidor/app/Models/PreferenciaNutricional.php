<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreferenciaNutricional extends Model
{
    protected $table = 'preferencias_nutricionales';
    protected $primaryKey = 'id_preferencia';
    public $timestamps = false;

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }
}