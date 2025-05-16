<?php

use App\Http\Controllers\AuthController;

Route::middleware('guest')->post('/login', [AuthController::class, 'login']);
Route::middleware('guest')->post('/register', [AuthController::class, 'register']);
Route::middleware('guest')->post('/forgot-password', [AuthController::class, 'forgotPassword']);

Route::middleware('auth')->group(function () {
    Route::get('/user',  [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Ruta catch-all para SPA Angular
Route::get('/{any}', function () {
    return file_get_contents(public_path('build/browser/index.html'));
})->where('any', '^(?!build/|assets/|favicon\\.ico|robots\\.txt|.*\\.(js|css|png|jpg|jpeg|gif|svg|ico|json)$).*$');