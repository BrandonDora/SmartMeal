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
        $path = \Storage::disk('public')->putFileAs('perfiles', $file, $filename);

        // Ruta pública correcta para acceder desde el frontend
        $publicPath = '/storage/perfiles/' . $filename;

        $user->foto_perfil = $publicPath;
        $user->save();

        return response()->json(['ruta' => $publicPath], 200);
    }
}