<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   public function register(Request $request)
    {
        $data = $request->validate([
            'usuario'  => 'required',
            'email'    => 'required|email',
            'password' => 'required|min:5|confirmed',
        ]);

        // Comprobar si el usuario ya existe
        if (User::where('usuario', $data['usuario'])->exists()) {
            return response()->json(['message' => 'El nombre de usuario ya está registrado.'], 409);
        }

        // Comprobar si el email ya existe
        if (User::where('email', $data['email'])->exists()) {
            return response()->json(['message' => 'El correo electrónico ya está registrado.'], 409);
        }

        $user = User::create([
            'usuario'  => $data['usuario'],
            'email'    => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        return response()->json(['message' => 'Usuario creado correctamente'], 201);
    }

    public function login(Request $request)
    {
        \Log::info('Intento de login', $request->all());
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (! $user) {
            return response()->json(['message' => 'Email not found'], 422);
        }

        if (! Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Incorrect password'], 422);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Logged in',
            'token' => $token,
        ], 200);
    }

    public function forgotPassword(Request $request)
    {
        return response()->json(['message' => 'Email sent']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
    
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out'], 204);
    }
}
