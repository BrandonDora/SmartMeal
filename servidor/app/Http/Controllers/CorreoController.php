<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class CorreoController extends Controller
{
    public function verificarCorreo(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->input('email');
        $existe = User::where('email', $email)->exists();
        return response()->json(['existe' => $existe]);
    }
}
