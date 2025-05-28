<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UsuarioController extends Controller
{
    public function subirFotoPerfil(Request $request)
    {
        $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096',
        ]);

        $user = Auth::user();
        $file = $request->file('foto');
        $filename = 'user_' . $user->id . '_' . time() . '.' . $file->getClientOriginalExtension();
        // Guardar en la carpeta correcta: storage/app/public/perfiles
        $file->move(storage_path('app/public/perfiles'), $filename);
        $publicPath = '/storage/perfiles/' . $filename;
        $user->foto_perfil = $publicPath;
        $user->save();

        return response()->json(['ruta' => $publicPath], 200);
    }

    public function actualizarNombre(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:50',
        ]);

        $user = Auth::user();
        $user->nombre = $request->nombre;
        $user->save();

        return response()->json(['message' => 'Nombre actualizado correctamente', 'nombre' => $user->nombre], 200);
    }
}