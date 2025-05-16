<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $table = 'menus';
    protected $primaryKey = 'id_menu';
    public $timestamps = false;

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }

    public function recetas()
    {
        return $this->belongsToMany(Receta::class, 'menu_receta', 'id_menu', 'id_receta');
    }
}