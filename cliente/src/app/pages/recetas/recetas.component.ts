import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTokenService } from '../../http-token.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearRecetaComponent } from '../../components/dialogs/crear-receta.component';
import { VerRecetaComponent } from '../../components/dialogs/ver-receta.component';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [
    RouterModule,
    LogedHeaderComponent,
    FooterComponent,
    CommonModule,
    CrearRecetaComponent,
    VerRecetaComponent,
  ],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.scss',
})
export class RecetasComponent implements OnInit {
  recetas: any[] = [];
  receta: any = null;
  x: number = 1;
  fotoPerfilUrl: string = 'assets/img/default.jpg';
  recetasMostradas: number = 6;

  constructor(
    private http: HttpClient,
    private tokenService: HttpTokenService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>('/api/recetas').subscribe({
      next: (data) => {
        this.recetas = data;
        console.log('Todas las recetas:', data);
      },
      error: (err) => console.error('Error al obtener recetas', err),
    });
    this.getRecetaPorId();
    this.tokenService.getUser().subscribe({
      next: (data) => {
        if (data.foto_perfil && data.foto_perfil.trim() !== '') {
          this.fotoPerfilUrl = data.foto_perfil.startsWith('/storage/')
            ? 'http://localhost:8000' + data.foto_perfil
            : data.foto_perfil;
        } else {
          this.fotoPerfilUrl = 'assets/img/default.jpg';
        }
      },
      error: () => {
        this.fotoPerfilUrl = 'assets/img/default.jpg';
      },
    });
  }

  getRecetaPorId(): void {
    this.http.get<any>(`/api/recetas/${this.x}`).subscribe({
      next: (data) => {
        this.receta = data;
        console.log('Receta por id:', data);
      },
      error: (err) => console.error('Error al obtener receta por id', err),
    });
  }

  getUserId(): number | null {
    // Suponiendo que el usuario está en localStorage como objeto JSON con id
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user).id;
      } catch {
        return null;
      }
    }
    return null;
  }

  onAnadirReceta(recetaId: number) {
    const usuarioId = this.getUserId();
    if (usuarioId !== null) {
      this.postMenuReceta(usuarioId, recetaId);
    } else {
      // Intentar obtener el usuario autenticado vía API con token
      const token = localStorage.getItem('token');
      const options = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      this.http.get<any>('/api/user', options).subscribe({
        next: (user) => {
          if (user && user.id) {
            this.postMenuReceta(user.id, recetaId);
          } else {
            alert('No se ha encontrado el usuario.');
          }
        },
        error: () => alert('No se ha encontrado el usuario.'),
      });
    }
  }

  postMenuReceta(usuarioId: number, recetaId: number) {
    const token = localStorage.getItem('token');
    const options = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    this.http
      .post(
        '/api/menuReceta',
        {
          receta_id: Number(recetaId),
          usuario_id: Number(usuarioId),
        },
        options
      )
      .subscribe({
        next: () => alert('Receta añadida al menú'),
        error: (err) => {
          const msg =
            err?.error?.message ||
            JSON.stringify(err?.error) ||
            'Error al añadir receta al menú';
          alert(msg);
        },
      });
  }

  abrirCrearReceta() {
    const dialogRef = this.dialog.open(CrearRecetaComponent, {
      width: '400px',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí podrías enviar la receta al backend
        // this.http.post('/api/recetas', result).subscribe(...)
        alert('Receta creada (simulado): ' + JSON.stringify(result));
      }
    });
  }

  abrirVerReceta(receta: any) {
    this.dialog.open(VerRecetaComponent, {
      width: '600px',
      data: receta,
    });
  }

  mostrarMasRecetas() {
    this.recetasMostradas += 6;
  }

  get mostrarBotonMostrarMas(): boolean {
    return this.recetas.length > this.recetasMostradas;
  }
}
