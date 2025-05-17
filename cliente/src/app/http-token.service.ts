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
}
