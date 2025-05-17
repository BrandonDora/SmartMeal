<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecetaController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/recetas', [RecetaController::class, 'recetas']);
Route::get('/recetas/{id}', [RecetaController::class, 'recetaPorId']);
Route::post('/recetas', [RecetaController::class, 'recetas']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
