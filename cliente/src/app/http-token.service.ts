import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class HttpTokenService {
  constructor(private http: HttpClient) {}

  getCsrfToken() {
    return this.http.get(`${baseUrl}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  }

  login(email: string, password: string) {
    return this.http.post<any>(
      `${baseUrl}/api/login`,
      { email, password }
      // { withCredentials: true }
    );
  }

  logout() {
    const token = localStorage.getItem('token');
    return this.http.post<any>(
      `${baseUrl}/api/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  getUser() {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${baseUrl}/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  register(data: {
    usuario: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    return this.http.post<any>(`${baseUrl}/api/register`, data);
  }

  getMenus() {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${baseUrl}/api/menus`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getMenuRecetas(idMenu: number) {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${baseUrl}/api/menuReceta${idMenu}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getRecetasByIds(ids: number[]) {
    const token = localStorage.getItem('token');
    const params = ids.map((id) => `ids[]=${id}`).join('&');
    return this.http.get<any[]>(`${baseUrl}/api/recetas/by-ids?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getPreferenciasNutricionalesByUser(userId: number) {
    const token = localStorage.getItem('token');
    return this.http.get<any>(
      `${baseUrl}/api/preferenciasNutricionales/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  crearMenu(nombre: string) {
    const token = localStorage.getItem('token');
    return this.http.post<any>(
      `${baseUrl}/api/menus`,
      { nombre },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  verificarCorreo(email: string) {
    return this.http.post<any>(`${baseUrl}/api/correos`, { email });
  }

  subirFotoPerfil(foto: File) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('foto', foto);
    return this.http.post<any>(`${baseUrl}/api/user/foto-perfil`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  actualizarNombre(nombre: string) {
    const token = localStorage.getItem('token');
    return this.http.post<any>(
      `${baseUrl}/api/user/actualizar-nombre`,
      { nombre },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  // Obtener recetas creadas por un usuario
  getRecetasByUser(userId: number) {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${baseUrl}/api/recetas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // El filtrado por user_id se hace en el frontend porque el endpoint no lo soporta
  }

  // Obtener recetas de un menú
  getRecetasDeMenu(idMenu: number) {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${baseUrl}/api/menus/${idMenu}/recetas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
