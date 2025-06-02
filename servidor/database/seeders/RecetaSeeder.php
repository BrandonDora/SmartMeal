<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecetaSeeder extends Seeder
{
    public function run(): void
    {
        // Obtener todos los ingredientes con sus valores nutricionales
        $ingredientes = DB::table('ingredientes')->get()->keyBy('id');
        // Obtener todas las relaciones receta-ingrediente
        $recetaIngredientes = DB::table('receta_ingrediente')->get();

        // Definir recetas y sus ingredientes (id, nombre, ...)
        $recetas = [
            [
                'nombre'        => 'Pollo a la plancha',
                'descripcion'   => 'Pechuga de pollo a la plancha con especias.',
                'imagen'        => 'Pollo_a_la_plancha.png',
                'instrucciones' => 'Sazona las pechugas con sal, pimienta y hierbas. Cocina en sartén bien caliente 6-7 min por lado hasta dorar. Deja reposar 2 min y sirve.',
                'tiempo_preparacion' => 20,
            ],
            [
                'nombre'        => 'Tortilla de patatas',
                'descripcion'   => 'Clásica tortilla española con huevo, patata y cebolla.',
                'imagen'        => 'Tortilla_de_patatas.png',
                'instrucciones' => 'Pocha patatas y cebolla en aceite a fuego medio. Escurre, mezcla con los huevos batidos y cuaja en sartén 4-5 min por cada lado.',
                'tiempo_preparacion' => 30,
            ],
            [
                'nombre'        => 'Salmón al horno',
                'descripcion'   => 'Lomo de salmón horneado con limón y eneldo.',
                'imagen'        => 'Salmon_al_horno.png',
                'instrucciones' => 'Coloca el salmón en bandeja, salpimenta, añade rodajas de limón y eneldo. Hornea a 190 °C durante 15-18 min.',
                'tiempo_preparacion' => 25,
            ],
            [
                'nombre'        => 'Gazpacho',
                'descripcion'   => 'Gazpacho andaluz frío de tomate, pepino y pimiento.',
                'imagen'        => 'Gazpacho.png',
                'instrucciones' => 'Tritura todos los ingredientes con aceite, vinagre y sal. Ajusta textura con agua fría. Refrigera al menos 1 h antes de servir.',
                'tiempo_preparacion' => 15,
            ],
            [
                'nombre'        => 'Paella mixta',
                'descripcion'   => 'Paella de marisco y pollo con verduras.',
                'imagen'        => 'Paella_mixta.png',
                'instrucciones' => 'Sofríe pollo y verduras, añade arroz y caldo con azafrán. Cocina 18 min; incorpora marisco los últimos 5 min. Reposa 5 min tapado.',
                'tiempo_preparacion' => 60,
            ],
            [
                'nombre'        => 'Spaghetti Bolognese',
                'descripcion'   => 'Espaguetis con salsa boloñesa de carne y tomate.',
                'imagen'        => 'Spaghetti_Bolognese.png',
                'instrucciones' => 'Cuece la pasta al dente. Sofríe carne, cebolla y zanahoria; agrega tomate y hierbas, cocina 20 min. Mezcla con la pasta y sirve.',
                'tiempo_preparacion' => 40,
            ],
            [
                'nombre'        => 'Smoothie de frutas',
                'descripcion'   => 'Batido de plátano y frutos rojos con yogur.',
                'imagen'        => 'Smoothie_de_frutas.png',
                'instrucciones' => 'Licúa plátano, frutos rojos, yogur y un chorrito de leche. Sirve frío inmediatamente.',
                'tiempo_preparacion' => 10,
            ],
            [
                'nombre'        => 'Hamburguesa vegana',
                'descripcion'   => 'Burger de garbanzos y quinoa con verduras.',
                'imagen'        => 'Hamburguesa_vegana.png',
                'instrucciones' => 'Tritura garbanzos cocidos y quinoa, mezcla con verduras ralladas y especias. Forma hamburguesas y cocina a la plancha 4 min por lado.',
                'tiempo_preparacion' => 35,
            ],
            [
                'nombre'        => 'Arroz con leche',
                'descripcion'   => 'Postre tradicional de arroz con leche aromatizado con canela y limón.',
                'imagen'        => 'Arroz_con_leche.png',
                'instrucciones' => 'Cuece el arroz en leche con canela y piel de limón a fuego lento 35-40 min, removiendo. Endulza, deja espesar y enfría.',
                'tiempo_preparacion' => 50,
            ],
            [
                'nombre'        => 'Sándwich mixto',
                'descripcion'   => 'Sándwich de jamón y queso a la plancha.',
                'imagen'        => 'Sandwich_mixto.png',
                'instrucciones' => 'Unta mantequilla en dos rebanadas de pan, coloca jamón y queso en medio. Dora en sartén a fuego medio 3-4 min por lado hasta que el queso funda.',
                'tiempo_preparacion' => 10,
            ],
            [
                'nombre'        => 'Yogur con granola',
                'descripcion'   => 'Yogur natural con granola y un toque de miel.',
                'imagen'        => 'Yogur_con_granola.png',
                'instrucciones' => 'Sirve el yogur en un bol, añade granola crujiente por encima y rocía con miel. Consume inmediatamente.',
                'tiempo_preparacion' => 5,
            ],
            [
                'nombre'        => 'Ensalada de frutas',
                'descripcion'   => 'Mezcla fresca de frutas de temporada.',
                'imagen'        => 'Ensalada_de_frutas.png',
                'instrucciones' => 'Lava y corta en cubos manzana, plátano, fresas y uvas. Mezcla en un bol y añade unas gotas de zumo de limón.',
                'tiempo_preparacion' => 10,
            ],
            [
                'nombre'        => 'Omelette de queso',
                'descripcion'   => 'Omelette esponjosa rellena de queso.',
                'imagen'        => 'Omelette_de_queso.png',
                'instrucciones' => 'Bate los huevos con sal y pimienta, vierte en sartén caliente. Cuando cuaje ligeramente, añade queso rallado, dobla y cocina 2 min más.',
                'tiempo_preparacion' => 8,
            ],
            [
                'nombre'        => 'Smoothie verde',
                'descripcion'   => 'Batido de espinacas, plátano y manzana.',
                'imagen'        => 'Smoothie_verde.png',
                'instrucciones' => 'Licúa espinacas frescas, plátano, manzana y agua fría hasta obtener una mezcla homogénea. Sirve al momento.',
                'tiempo_preparacion' => 7,
            ],
            [
                'nombre'        => 'Cuscús de cordero Halal',
                'descripcion'   => 'Cuscús tradicional con cordero certificado Halal, verduras y especias.',
                'imagen'        => 'Cuscus_cordero_halal.png',
                'instrucciones' => 'Dora el cordero en aceite de oliva, añade cebolla, zanahoria y calabacín. Incorpora especias (comino, cúrcuma), cubre con caldo y cocina hasta que la carne esté tierna. Sirve sobre cuscús hidratado.',
                'tiempo_preparacion' => 60,
            ],
            [
                'nombre'        => 'Tajine de pollo Halal',
                'descripcion'   => 'Pollo certificado Halal guisado con ciruelas, almendras y especias marroquíes.',
                'imagen'        => 'Tajine_pollo_halal.png',
                'instrucciones' => 'Dora el pollo en aceite de oliva, añade cebolla, ajo, jengibre, canela y cúrcuma. Incorpora ciruelas y almendras, cubre con caldo y cocina a fuego lento hasta que el pollo esté tierno y la salsa espese.',
                'tiempo_preparacion' => 75,
            ],
            [
                'nombre'        => 'Falafel vegano',
                'descripcion'   => 'Bocaditos de garbanzos y especias, fritos y servidos con salsa tahini.',
                'imagen'        => 'Falafel_vegano.png',
                'instrucciones' => 'Tritura garbanzos cocidos con ajo, cebolla, perejil, cilantro, comino y sal. Forma bolas y fríe en aceite caliente hasta dorar. Sirve con salsa tahini.',
                'tiempo_preparacion' => 40,
            ],
            [
                'nombre'        => 'Ensalada tabulé',
                'descripcion'   => 'Ensalada fresca de bulgur, tomate, pepino, perejil y menta.',
                'imagen'        => 'Ensalada_tabule.png',
                'instrucciones' => 'Hidrata el bulgur en agua fría. Mezcla con tomate, pepino, cebolla, perejil, menta, zumo de limón y aceite de oliva. Sirve frío.',
                'tiempo_preparacion' => 25,
            ],
            [
                'nombre'        => 'Shakshuka',
                'descripcion'   => 'Huevos escalfados en salsa de tomate, pimiento y especias.',
                'imagen'        => 'Shakshuka.png',
                'instrucciones' => 'Sofríe cebolla y pimiento, añade tomate triturado, comino y pimentón. Cocina y haz huecos para los huevos. Escalfa los huevos en la salsa y sirve con pan.',
                'tiempo_preparacion' => 35,
            ],
        ];

        foreach ($recetas as $i => $receta) {
            $id_receta = $i + 1;
            $ingredientesReceta = $recetaIngredientes->where('id_receta', $id_receta);
            $calorias = 0;
            $proteinas = 0;
            $grasas = 0;
            $carbohidratos = 0;
            foreach ($ingredientesReceta as $ri) {
                $ing = $ingredientes[$ri->id_ingrediente] ?? null;
                if ($ing) {
                    $cantidad = $ri->cantidad;
                    $calorias      += $ing->calorias * $cantidad;
                    $proteinas     += $ing->proteinas * $cantidad;
                    $grasas        += $ing->grasas * $cantidad;
                    $carbohidratos += $ing->carbohidratos * $cantidad;
                }
            }
            DB::table('recetas')->insert([
                'nombre'        => $receta['nombre'],
                'descripcion'   => $receta['descripcion'],
                'imagen'        => $receta['imagen'],
                'instrucciones' => $receta['instrucciones'],
                'tiempo_preparacion' => $receta['tiempo_preparacion'],
                'calorias'      => round($calorias),
                'proteinas'     => round($proteinas),
                'grasas'        => round($grasas),
                'carbohidratos' => round($carbohidratos),
            ]);
        }
    }
}
