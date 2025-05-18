<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Menu extends Model
{
    use HasFactory;
    protected $table = 'menus';
    protected $primaryKey = 'id_menu';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }

    public function recetas()
    {
        return $this->belongsToMany(Receta::class, 'menu_receta', 'id_menu', 'id_receta');
    }
}