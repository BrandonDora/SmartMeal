import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpTokenService } from '../../http-token.service';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CambiarFotoComponent } from '../../components/dialogs/cambiar-foto.component';
import { SubirFotoComponent } from '../../components/dialogs/subir-foto.component';
import { CambiarNombreComponent } from '../../components/dialogs/cambiar-nombre.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    RouterModule,
    LogedHeaderComponent,
    FooterComponent,
    MatDialogModule,
    CambiarFotoComponent,
    SubirFotoComponent,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  usuario = {
    nombre: 'Brandon Acapa',
    email: 'brandonemail.com',
    fechaRegistro: 'Enero 2025',
    foto_perfil: '',
  };

  get fotoPerfilUrl(): string {
    if (this.usuario.foto_perfil && this.usuario.foto_perfil.trim() !== '') {
      if (this.usuario.foto_perfil.startsWith('/storage/')) {
        return 'http://localhost:8000' + this.usuario.foto_perfil;
      }
      return this.usuario.foto_perfil;
    }
    return 'assets/img/default.jpg';
  }

  constructor(
    private tokenService: HttpTokenService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tokenService.getUser().subscribe({
      next: (user) => {
        this.usuario = {
          nombre: user.nombre || user.name || '',
          email: user.email || '',
          fechaRegistro: user.created_at
            ? this.formatearFecha(user.created_at)
            : '',
          foto_perfil: user.foto_perfil || '',
        };
      },
      error: () => {
        // Si hay error, mantener datos por defecto
      },
    });
  }

  private formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return `${meses[date.getMonth()]} ${date.getFullYear()}`;
  }

  abrirDialogoCambiarFoto() {
    const ref = this.dialog.open(CambiarFotoComponent);
    ref.afterClosed().subscribe((result) => {
      if (result) {
        setTimeout(() => {
          const subirRef = this.dialog.open(SubirFotoComponent);
          subirRef.afterClosed().subscribe((nuevaRuta) => {
            if (nuevaRuta) {
              this.usuario.foto_perfil = nuevaRuta;
            }
          });
        }, 100);
      }
    });
  }

  abrirDialogoCambiarNombre() {
    const ref = this.dialog.open(CambiarNombreComponent, {
      data: { nombreActual: this.usuario.nombre },
    });
    ref.afterClosed().subscribe((nuevoNombre) => {
      if (nuevoNombre) {
        this.usuario.nombre = nuevoNombre;
        // Aquí puedes llamar a un servicio para guardar el cambio en el backend si lo deseas
      }
    });
  }

  logout() {
    this.tokenService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
    });
  }
}
