<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreferenciaNutricional extends Model
{
    protected $table = 'preferencias_nutricionales';
    protected $primaryKey = 'id_preferencia';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'calorias_mantenimiento',
        'calorias_deseadas',
        'objetivo',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'calorias_mantenimiento' => 'integer',
        'calorias_deseadas' => 'integer',
        'objetivo' => 'string',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }
}