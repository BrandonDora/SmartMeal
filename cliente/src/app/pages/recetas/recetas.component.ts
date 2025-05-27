import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTokenService } from '../../http-token.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrearRecetaComponent } from '../../components/dialogs/crear-receta.component';
import { VerRecetaComponent } from '../../components/dialogs/ver-receta.component';
import { ModalInfoComponent } from '../../components/dialogs/modal-info.component';

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
    ModalInfoComponent,
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

  onAnadirReceta(recetaId: number) {
    const token = localStorage.getItem('token');
    const options = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    this.http.get<any>('/api/user', options).subscribe({
      next: (user) => {
        if (user && user.id) {
          this.comprobarYAnadirRecetaAMenu(user.id, recetaId);
        } else {
          this.mostrarModalInfo('No se ha encontrado el usuario.');
        }
      },
      error: () => this.mostrarModalInfo('No se ha encontrado el usuario.'),
    });
  }

  comprobarYAnadirRecetaAMenu(usuarioId: number, recetaId: number) {
    const token = localStorage.getItem('token');
    const options = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    this.http.get<any[]>('/api/menus', options).subscribe({
      next: (menus) => {
        const menusUsuario = menus.filter((m: any) => m.user_id === usuarioId);
        if (!menusUsuario.length) {
          this.mostrarModalInfo(
            'Aún no tienes ningún menú, por favor crea uno'
          );
          return;
        }
        // Buscar el menú más reciente por fecha_creacion o created_at
        const menuMasReciente = menusUsuario.reduce((a: any, b: any) => {
          const fechaA = new Date(a.fecha_creacion || a.created_at);
          const fechaB = new Date(b.fecha_creacion || b.created_at);
          return fechaA > fechaB ? a : b;
        });
        // Comprobar si la receta ya está en el menú más reciente
        this.http
          .get<any[]>(`/api/menus/${menuMasReciente.id_menu}/recetas`, options)
          .subscribe({
            next: (recetasMenu) => {
              const yaAnadida = recetasMenu.some(
                (r: any) => r.id === recetaId || r.receta_id === recetaId
              );
              if (yaAnadida) {
                this.mostrarModalInfo('Esta receta ya está añadida');
                return;
              }
              this.postMenuReceta(menuMasReciente.id_menu, recetaId, usuarioId);
            },
            error: () => {
              this.mostrarModalInfo('Error al comprobar las recetas del menú.');
            },
          });
      },
      error: () => {
        this.mostrarModalInfo('Error al comprobar los menús del usuario.');
      },
    });
  }

  postMenuReceta(menuId: number, recetaId: number, usuarioId: number) {
    const token = localStorage.getItem('token');
    const options = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    this.http
      .post(
        '/api/menuReceta',
        {
          usuario_id: usuarioId,
          receta_id: Number(recetaId),
        },
        options
      )
      .subscribe({
        next: () => this.mostrarModalInfo('Receta añadida al menú'),
        error: (err) => {
          const msg =
            err?.error?.message ||
            JSON.stringify(err?.error) ||
            'Error al añadir receta al menú';
          this.mostrarModalInfo(msg);
        },
      });
  }

  abrirCrearReceta() {
    const dialogRef = this.dialog.open(CrearRecetaComponent, {
      width: '80vw', // Ahora el modal ocupa el 80% del ancho de la ventana
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

  mostrarModalInfo(mensaje: string) {
    this.dialog.open(ModalInfoComponent, {
      data: { mensaje },
      width: '350px',
    });
  }

  mostrarMasRecetas() {
    this.recetasMostradas += 6;
  }

  get mostrarBotonMostrarMas(): boolean {
    return this.recetas.length > this.recetasMostradas;
  }
}
