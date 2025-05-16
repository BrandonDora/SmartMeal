<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListaCompra extends Model
{
    protected $table = 'lista_compra';
    protected $primaryKey = 'id_lista';
    public $timestamps = false;

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }

    public function recetas()
    {
        return $this->belongsToMany(Receta::class, 'lista_compras_receta', 'id_lista', 'id_receta');
    }

    public function ingredientes()
    {
        return $this->belongsToMany(Ingrediente::class, 'lista_ingrediente', 'id_lista', 'id_ingrediente')
                    ->withPivot('cantidad_total');
    }
}