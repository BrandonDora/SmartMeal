<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecetaSeeder extends Seeder
{
    public function run(): void
    {
        $Ensalada = DB::table('recetas')->insertGetId([
            'nombre'       => 'Ensalada',
            'descripcion'  => 'Ensalada de lechuga.',
            'imagen'       => 'http://localhost:8000/storage/recetas/Ensalada.png',
            'instrucciones'=> 'Lava la lechuga, córtala en trozos y sécala bien. Aliña con aceite de oliva, vinagre y sal al gusto. Mezcla y sirve inmediatamente.',
            'tiempo_preparacion' => 10,
            'calorias'     => 420,
            'proteinas'    => 45,
            'grasas'       => 5,
            'carbohidratos'=> 35,
        ]);

        $Pancake = DB::table('recetas')->insertGetId([
            'nombre'       => 'Pancakes',
            'descripcion'  => 'Pancake rico',
            'imagen'       => 'http://localhost:8000/storage/recetas/Pancakes.png',
            'instrucciones'=> 'Bate harina, huevo, leche y una pizca de azúcar hasta obtener una masa homogénea. Vierte porciones en sartén caliente engrasada y cocina 2-3 min por lado hasta dorar.',
            'tiempo_preparacion' => 20,
            'calorias'     => 380,
            'proteinas'    => 35,
            'grasas'       => 15,
            'carbohidratos'=> 40,
        ]);

        $Tostada = DB::table('recetas')->insertGetId([
            'nombre'       => 'Tostadas',
            'descripcion'  => 'Tostadas con mermelada',
            'imagen'       => 'http://localhost:8000/storage/recetas/Tostadas.png',
            'instrucciones'=> 'Tuesta las rebanadas de pan hasta que queden crujientes. Unta mermelada al gusto y sirve de inmediato.',
            'tiempo_preparacion' => 5,
            'calorias'     => 280,
            'proteinas'    => 35,
            'grasas'       => 15,
            'carbohidratos'=> 40,
        ]);

        $PolloALaPlancha = DB::table('recetas')->insertGetId([
            'nombre'        => 'Pollo a la plancha',
            'descripcion'   => 'Pechuga de pollo a la plancha con especias.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Pollo_a_la_plancha.png',
            'instrucciones' => 'Sazona las pechugas con sal, pimienta y hierbas. Cocina en sartén bien caliente 6-7 min por lado hasta dorar. Deja reposar 2 min y sirve.',
            'tiempo_preparacion' => 20,
            'calorias'      => 350,
            'proteinas'     => 40,
            'grasas'        => 12,
            'carbohidratos' => 15,
        ]);

        $TortillaPatatas = DB::table('recetas')->insertGetId([
            'nombre'        => 'Tortilla de patatas',
            'descripcion'   => 'Clásica tortilla española con huevo, patata y cebolla.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Tortilla_de_patatas.png',
            'instrucciones' => 'Pocha patatas y cebolla en aceite a fuego medio. Escurre, mezcla con los huevos batidos y cuaja en sartén 4-5 min por cada lado.',
            'tiempo_preparacion' => 30,
            'calorias'      => 300,
            'proteinas'     => 18,
            'grasas'        => 20,
            'carbohidratos' => 20,
        ]);

        $SalmonAlHorno = DB::table('recetas')->insertGetId([
            'nombre'        => 'Salmón al horno',
            'descripcion'   => 'Lomo de salmón horneado con limón y eneldo.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Salmon_al_horno.png',
            'instrucciones' => 'Coloca el salmón en bandeja, salpimenta, añade rodajas de limón y eneldo. Hornea a 190 °C durante 15-18 min.',
            'tiempo_preparacion' => 25,
            'calorias'      => 450,
            'proteinas'     => 40,
            'grasas'        => 30,
            'carbohidratos' => 2,
        ]);

        $Gazpacho = DB::table('recetas')->insertGetId([
            'nombre'        => 'Gazpacho',
            'descripcion'   => 'Gazpacho andaluz frío de tomate, pepino y pimiento.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Gazpacho.png',
            'instrucciones' => 'Tritura todos los ingredientes con aceite, vinagre y sal. Ajusta textura con agua fría. Refrigera al menos 1 h antes de servir.',
            'tiempo_preparacion' => 15,
            'calorias'      => 150,
            'proteinas'     => 4,
            'grasas'        => 7,
            'carbohidratos' => 18,
        ]);

        $PaellaMixta = DB::table('recetas')->insertGetId([
            'nombre'        => 'Paella mixta',
            'descripcion'   => 'Paella de marisco y pollo con verduras.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Paella_mixta.png',
            'instrucciones' => 'Sofríe pollo y verduras, añade arroz y caldo con azafrán. Cocina 18 min; incorpora marisco los últimos 5 min. Reposa 5 min tapado.',
            'tiempo_preparacion' => 60,
            'calorias'      => 550,
            'proteinas'     => 35,
            'grasas'        => 20,
            'carbohidratos' => 60,
        ]);

        $SpaghettiBolo = DB::table('recetas')->insertGetId([
            'nombre'        => 'Spaghetti Bolognese',
            'descripcion'   => 'Espaguetis con salsa boloñesa de carne y tomate.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Spaghetti_Bolognese.png',
            'instrucciones' => 'Cuece la pasta al dente. Sofríe carne, cebolla y zanahoria; agrega tomate y hierbas, cocina 20 min. Mezcla con la pasta y sirve.',
            'tiempo_preparacion' => 40,
            'calorias'      => 600,
            'proteinas'     => 25,
            'grasas'        => 22,
            'carbohidratos' => 70,
        ]);

        $SmoothieFrutas = DB::table('recetas')->insertGetId([
            'nombre'        => 'Smoothie de frutas',
            'descripcion'   => 'Batido de plátano y frutos rojos con yogur.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Smoothie_de_frutas.png',
            'instrucciones' => 'Licúa plátano, frutos rojos, yogur y un chorrito de leche. Sirve frío inmediatamente.',
            'tiempo_preparacion' => 10,
            'calorias'      => 250,
            'proteinas'     => 5,
            'grasas'        => 2,
            'carbohidratos' => 55,
        ]);

        $HamburguesaVegana = DB::table('recetas')->insertGetId([
            'nombre'        => 'Hamburguesa vegana',
            'descripcion'   => 'Burger de garbanzos y quinoa con verduras.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Hamburguesa_vegana.png',
            'instrucciones' => 'Tritura garbanzos cocidos y quinoa, mezcla con verduras ralladas y especias. Forma hamburguesas y cocina a la plancha 4 min por lado.',
            'tiempo_preparacion' => 35,
            'calorias'      => 400,
            'proteinas'     => 20,
            'grasas'        => 10,
            'carbohidratos' => 60,
        ]);

        $ArrozConLeche = DB::table('recetas')->insertGetId([
            'nombre'        => 'Arroz con leche',
            'descripcion'   => 'Postre tradicional de arroz con leche aromatizado con canela y limón.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Arroz_con_leche.png',
            'instrucciones' => 'Cuece el arroz en leche con canela y piel de limón a fuego lento 35-40 min, removiendo. Endulza, deja espesar y enfría.',
            'tiempo_preparacion' => 50,
            'calorias'      => 300,
            'proteinas'     => 7,
            'grasas'        => 6,
            'carbohidratos' => 55,
        ]);


        // $polloId = DB::table('recetas')->insertGetId([
        //     'nombre'       => 'Pollo con arroz y brócoli',
        //     'descripcion'  => 'Fácil plato completo para almuerzo.',
        //     'calorias'     => 450,
        //     'proteinas'    => 36,
        //     'grasas'       => 10,
        //     'carbohidratos'=> 50,
        // ]);

        // DB::table('receta_ingrediente')->insert([
        //     ['id_receta' => $polloId, 'id_ingrediente' => 1, 'cantidad' => 150],
        //     ['id_receta' => $polloId, 'id_ingrediente' => 2, 'cantidad' => 100],
        //     ['id_receta' => $polloId, 'id_ingrediente' => 3, 'cantidad' => 80],
        // ]);

        // $batidoId = DB::table('recetas')->insertGetId([
        //     'nombre'       => 'Batido de proteínas vegano',
        //     'descripcion'  => 'Ideal post‑entreno.',
        //     'calorias'     => 300,
        //     'proteinas'    => 25,
        //     'grasas'       => 8,
        //     'carbohidratos'=> 35,
        // ]);
    }
}
