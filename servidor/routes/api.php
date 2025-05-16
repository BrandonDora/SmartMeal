<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'La API funciona correctamente']);
});

Route::post('login',    [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout',   [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('user', function(Request $r){
    return $r->user();
});

// php artisan serve --host=localhost --port=8000