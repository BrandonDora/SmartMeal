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
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { environment } from '../../../environments/environment';

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
    CommonModule,
    MatProgressBarModule,
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

  recetasGuardadas: number = 0;
  recetasCreadas: number = 0;
  diasRegistro: number = 0;
  tieneObjetivosNutricionales: boolean | null = null;
  caloriasDeseadas: number | null = null;
  proteinas: number | null = null;
  carbohidratos: number | null = null;
  grasas: number | null = null;
  caloriasConsumidas: number = 0;
  caloriasMantenimiento: number | null = null;

  // NUEVO: para la barra de progreso tipo dashboard
  porcentajeCalorias: number = 0;

  get fotoPerfilUrl(): string {
    const basePerfil =
      'https://s3.us-east-1.amazonaws.com/smartmeal.imagenes/perfiles/';
    if (this.usuario.foto_perfil && this.usuario.foto_perfil.trim() !== '') {
      if (this.usuario.foto_perfil.startsWith('http')) {
        return this.usuario.foto_perfil;
      }
      // Si es solo el nombre del archivo o una ruta relativa
      const nombre = this.usuario.foto_perfil.replace(/^.*[\\\/]/, '');
      return basePerfil + nombre;
    }
    return basePerfil + 'default.jpg';
  }

  constructor(
    private tokenService: HttpTokenService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Leer progreso de calorías y menú activo igual que en dashboard
    const menuActivoGuardado = localStorage.getItem('menuActivo');
    const progresoGuardado = localStorage.getItem('progresoMenu');
    let caloriasProgreso = 0;
    if (menuActivoGuardado && progresoGuardado) {
      try {
        const menuActivo = Number(menuActivoGuardado);
        const progresoPorMenu = JSON.parse(progresoGuardado);
        if (
          progresoPorMenu[menuActivo] &&
          typeof progresoPorMenu[menuActivo].calorias === 'number'
        ) {
          caloriasProgreso = progresoPorMenu[menuActivo].calorias;
        }
      } catch {}
    }
    this.caloriasConsumidas = caloriasProgreso;
    // Calcular porcentaje si hay caloriasDeseadas (se recalcula más abajo si hay prefs)
    if (this.caloriasDeseadas && this.caloriasDeseadas > 0) {
      this.porcentajeCalorias = Math.min(
        100,
        (this.caloriasConsumidas / this.caloriasDeseadas) * 100
      );
    } else {
      this.porcentajeCalorias = 0;
    }

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
        // Calcular días desde el registro
        if (user.created_at) {
          const fechaRegistro = new Date(user.created_at);
          const hoy = new Date();
          const diff = hoy.getTime() - fechaRegistro.getTime();
          this.diasRegistro = Math.floor(diff / (1000 * 60 * 60 * 24));
        }
        // Obtener recetas creadas
        this.obtenerRecetasCreadas(user.id);
        // Obtener recetas guardadas
        this.obtenerRecetasGuardadas(user.id);
        // Calcular calorías consumidas hoy (esto puede sobreescribir caloriasConsumidas)
        this.calcularCaloriasConsumidasHoy(user.id);
        // Comprobar si tiene objetivos nutricionales
        this.tokenService
          .getPreferenciasNutricionalesByUser(user.id)
          .subscribe({
            next: (prefs) => {
              if (Array.isArray(prefs) && prefs.length > 0) {
                this.tieneObjetivosNutricionales = true;
                this.caloriasDeseadas = prefs[0].calorias_deseadas;
                this.caloriasMantenimiento = prefs[0].calorias_mantenimiento;
                this.superavit();
                // Recalcular porcentaje con caloriasDeseadas real
                if (this.caloriasDeseadas && this.caloriasDeseadas > 0) {
                  this.porcentajeCalorias = Math.min(
                    100,
                    (this.caloriasConsumidas / this.caloriasDeseadas) * 100
                  );
                } else {
                  this.porcentajeCalorias = 0;
                }
              } else {
                this.tieneObjetivosNutricionales = false;
                this.caloriasDeseadas = null;
                this.caloriasMantenimiento = null;
                this.superavit();
                this.porcentajeCalorias = 0;
              }
            },
            error: () => {
              this.tieneObjetivosNutricionales = false;
              this.caloriasDeseadas = null;
              this.caloriasMantenimiento = null;
              this.superavit();
              this.porcentajeCalorias = 0;
            },
          });
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
    // Formato: 1 de Mayo 2025
    return `${date.getDate()} de ${
      meses[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  abrirDialogoCambiarFoto() {
    const ref = this.dialog.open(CambiarFotoComponent);
    ref.afterClosed().subscribe((result) => {
      if (result) {
        setTimeout(() => {
          const subirRef = this.dialog.open(SubirFotoComponent);
          subirRef.afterClosed().subscribe((nuevaRuta) => {
            if (nuevaRuta) {
              // Actualizar en backend la foto de perfil
              this.tokenService.actualizarFotoPerfil(nuevaRuta).subscribe({
                next: () => {
                  this.usuario.foto_perfil = nuevaRuta;
                  this.snackBar.open('Foto de perfil actualizada', 'Cerrar', {
                    duration: 2000,
                  });
                },
                error: () => {
                  this.snackBar.open(
                    'Error al actualizar la foto de perfil',
                    'Cerrar',
                    { duration: 3000 }
                  );
                },
              });
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
        this.tokenService.actualizarNombre(nuevoNombre).subscribe({
          next: (resp) => {
            // Tras actualizar, recargar datos del usuario desde el backend
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
              error: () => {},
            });
          },
          error: () => {},
        });
      }
    });
  }

  obtenerRecetasCreadas(userId: number) {
    this.tokenService.getRecetasByUser(userId).subscribe({
      next: (recetas) => {
        // Filtrar recetas por user_id
        const propias = recetas.filter((r: any) => r.user_id === userId);
        this.recetasCreadas = propias.length;
      },
      error: () => {
        this.recetasCreadas = 0;
      },
    });
  }

  obtenerRecetasGuardadas(userId: number) {
    this.tokenService.getMenus().subscribe({
      next: (menus) => {
        const menusUsuario = menus.filter((m: any) => m.user_id === userId);
        if (!menusUsuario.length) {
          this.recetasGuardadas = 0;
          return;
        }
        let total = 0;
        let pendientes = menusUsuario.length;
        menusUsuario.forEach((menu: any) => {
          this.tokenService.getRecetasDeMenu(menu.id_menu).subscribe({
            next: (recetas: any[]) => {
              total += recetas.length;
              pendientes--;
              if (pendientes === 0) {
                this.recetasGuardadas = total;
              }
            },
            error: () => {
              pendientes--;
              if (pendientes === 0) {
                this.recetasGuardadas = total;
              }
            },
          });
        });
      },
      error: () => {
        this.recetasGuardadas = 0;
      },
    });
  }

  // Calcula las calorías consumidas hoy sumando las calorías de las recetas de los menús del día actual
  calcularCaloriasConsumidasHoy(userId: number) {
    this.tokenService.getMenus().subscribe({
      next: (menus) => {
        const hoy = new Date();
        const menusHoy = menus.filter(
          (m: any) =>
            m.user_id === userId &&
            m.fecha &&
            new Date(m.fecha).toDateString() === hoy.toDateString()
        );
        if (!menusHoy.length) {
          this.caloriasConsumidas = 0;
          return;
        }
        let total = 0;
        let pendientes = menusHoy.length;
        menusHoy.forEach((menu: any) => {
          this.tokenService.getRecetasDeMenu(menu.id_menu).subscribe({
            next: (recetas: any[]) => {
              recetas.forEach((receta: any) => {
                total += receta.calorias || 0;
              });
              pendientes--;
              if (pendientes === 0) {
                this.caloriasConsumidas = total;
              }
            },
            error: () => {
              pendientes--;
              if (pendientes === 0) {
                this.caloriasConsumidas = total;
              }
            },
          });
        });
      },
      error: () => {
        this.caloriasConsumidas = 0;
      },
    });
  }

  superavit() {
    if (this.caloriasDeseadas !== null) {
      this.proteinas = Math.round((this.caloriasDeseadas * 0.25) / 4);
      this.carbohidratos = Math.round((this.caloriasDeseadas * 0.45) / 4);
      this.grasas = Math.round((this.caloriasDeseadas * 0.3) / 9);
    } else {
      this.proteinas = null;
      this.carbohidratos = null;
      this.grasas = null;
    }
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
