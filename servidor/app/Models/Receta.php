<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receta extends Model
{
    protected $table = 'recetas';
    protected $primaryKey = 'id_receta';
    public $timestamps = true; // Cambiado a true para usar created_at/updated_at
    protected $fillable = [
        'nombre', 'descripcion', 'imagen', 'instrucciones', 'tiempo_preparacion',
        'calorias', 'proteinas', 'grasas', 'carbohidratos', 'categoria', 'user_id'
    ];

    public function tiemposComida()
    {
        return $this->belongsToMany(TiempoComida::class, 'receta_tiempo_comida', 'id_receta', 'id_tipo');
    }

    public function ingredientes()
    {
        return $this->belongsToMany(Ingrediente::class, 'receta_ingrediente', 'id_receta', 'id_ingrediente')
                    ->withPivot('cantidad');
    }

    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'menu_receta', 'id_receta', 'id_menu');
    }

    public function categorias()
    {
        return $this->belongsToMany(\App\Models\Categoria::class, 'receta_categoria', 'receta_id', 'categoria_id');
    }

    public static function all($columns = ['*'])
    {
        // Usando Eloquent
        return self::query()->get($columns);
    }

    public static function find($id, $columns = ['*'])
    {
        return self::query()->where('id_receta', $id)->first($columns);
    }
}