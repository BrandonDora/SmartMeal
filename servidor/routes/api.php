<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecetaController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PreferenciaNutricionalController;
use App\Http\Controllers\CorreoController;
use App\Http\Controllers\UsuarioController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/recetas', [RecetaController::class, 'store']);
Route::get('/recetas', [RecetaController::class, 'recetas']);
Route::middleware(['auth:sanctum'])->get('/user', [AuthController::class, 'user']);
Route::middleware(['auth:sanctum'])->get('/menus', [MenuController::class, 'menus']);
Route::middleware(['auth:sanctum'])->post('/calculadora', [PreferenciaNutricionalController::class, 'calcular']);
Route::middleware(['auth:sanctum'])->post('/menuReceta', [MenuController::class, 'menuReceta']);
Route::middleware(['auth:sanctum'])->get('/menuReceta{id}', [MenuController::class, 'menuReceta']);
Route::middleware(['auth:sanctum'])->get('/recetas/by-ids', [MenuController::class, 'recetasByIds']);
Route::get('/recetas/{id}', [RecetaController::class, 'recetaPorId']);
Route::middleware(['auth:sanctum'])->get('/preferenciasNutricionales/{id}', [PreferenciaNutricionalController::class, 'showByUser']);
Route::middleware(['auth:sanctum'])->post('/menus', [MenuController::class, 'crearMenu']);
Route::post('/correos', [CorreoController::class, 'verificarCorreo']);
Route::middleware(['auth:sanctum'])->post('/user/foto-perfil', [UsuarioController::class, 'subirFotoPerfil']);
Route::middleware(['auth:sanctum'])->get('/menus/{id_menu}/recetas', [MenuController::class, 'recetasDeMenu']);