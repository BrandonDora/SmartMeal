<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecetaSeeder extends Seeder
{
    public function run(): void
    {
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

        $SandwichMixto = DB::table('recetas')->insertGetId([
            'nombre'        => 'Sándwich mixto',
            'descripcion'   => 'Sándwich de jamón y queso a la plancha.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Sandwich_mixto.png',
            'instrucciones' => 'Unta mantequilla en dos rebanadas de pan, coloca jamón y queso en medio. Dora en sartén a fuego medio 3-4 min por lado hasta que el queso funda.',
            'tiempo_preparacion' => 10,
            'calorias'      => 320,
            'proteinas'     => 18,
            'grasas'        => 15,
            'carbohidratos' => 28,
        ]);

        $YogurGranola = DB::table('recetas')->insertGetId([
            'nombre'        => 'Yogur con granola',
            'descripcion'   => 'Yogur natural con granola y un toque de miel.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Yogur_con_granola.png',
            'instrucciones' => 'Sirve el yogur en un bol, añade granola crujiente por encima y rocía con miel. Consume inmediatamente.',
            'tiempo_preparacion' => 5,
            'calorias'      => 250,
            'proteinas'     => 8,
            'grasas'        => 6,
            'carbohidratos' => 40,
        ]);

        $EnsaladaFrutas = DB::table('recetas')->insertGetId([
            'nombre'        => 'Ensalada de frutas',
            'descripcion'   => 'Mezcla fresca de frutas de temporada.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Ensalada_de_frutas.png',
            'instrucciones' => 'Lava y corta en cubos manzana, plátano, fresas y uvas. Mezcla en un bol y añade unas gotas de zumo de limón.',
            'tiempo_preparacion' => 10,
            'calorias'      => 180,
            'proteinas'     => 3,
            'grasas'        => 1,
            'carbohidratos' => 45,
        ]);

        $OmeletteQueso = DB::table('recetas')->insertGetId([
            'nombre'        => 'Omelette de queso',
            'descripcion'   => 'Omelette esponjosa rellena de queso.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Omelette_de_queso.png',
            'instrucciones' => 'Bate los huevos con sal y pimienta, vierte en sartén caliente. Cuando cuaje ligeramente, añade queso rallado, dobla y cocina 2 min más.',
            'tiempo_preparacion' => 8,
            'calorias'      => 275,
            'proteinas'     => 17,
            'grasas'        => 20,
            'carbohidratos' => 2,
        ]);

        $SmoothieVerde = DB::table('recetas')->insertGetId([
            'nombre'        => 'Smoothie verde',
            'descripcion'   => 'Batido de espinacas, plátano y manzana.',
            'imagen'        => 'http://localhost:8000/storage/recetas/Smoothie_verde.png',
            'instrucciones' => 'Licúa espinacas frescas, plátano, manzana y agua fría hasta obtener una mezcla homogénea. Sirve al momento.',
            'tiempo_preparacion' => 7,
            'calorias'      => 200,
            'proteinas'     => 4,
            'grasas'        => 2,
            'carbohidratos' => 45,
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
