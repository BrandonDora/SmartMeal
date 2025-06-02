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
import { ElegirMenuComponent } from '../../components/dialogs/elegir-menu.component';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [
    RouterModule,
    LogedHeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    CrearRecetaComponent,
    VerRecetaComponent,
    ModalInfoComponent,
    ElegirMenuComponent,
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
  tiposComida: any[] = [];
  tipoComidaSeleccionado: number | null = null;
  recetasOriginales: any[] = [];
  categorias: any[] = [];
  categoriaSeleccionada: number | null = null;
  busquedaReceta: string = '';

  constructor(
    private http: HttpClient,
    private tokenService: HttpTokenService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Cargar tipos de comida
    this.http.get<any[]>(environment.apiUrl + '/api/tiempo_comida').subscribe({
      next: (data) => {
        this.tiposComida = data;
      },
      error: (err) => console.error('Error al obtener tipos de comida', err),
    });
    // Cargar todas las recetas (por defecto)
    this.http.get<any[]>(environment.apiUrl + '/api/recetas').subscribe({
      next: (data) => {
        this.recetas = data.map((receta) => {
          let imagen = receta.imagen_url || receta.imagen;
          if (!imagen || imagen.trim() === '') {
            imagen = 'assets/img/default.jpg';
          } else if (imagen.startsWith('assets/img')) {
            // Ya es ruta relativa
          } else if (!imagen.includes('/')) {
            imagen = 'assets/img/' + imagen;
          } else if (imagen.startsWith('http')) {
            // Si es URL absoluta, la dejamos (por compatibilidad)
          } else {
            imagen = 'assets/img/' + imagen;
          }
          return { ...receta, imagen };
        });
        this.recetasOriginales = [...this.recetas];
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
    // Cargar categorías desde la API
    this.http.get<any[]>(environment.apiUrl + '/api/categorias').subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => console.error('Error al obtener categorías', err),
    });
  }

  getRecetaPorId(): void {
    this.http
      .get<any>(`${environment.apiUrl}/api/recetas/${this.x}`)
      .subscribe({
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
    this.http.get<any>(environment.apiUrl + '/api/user', options).subscribe({
      next: (user) => {
        if (user && user.id) {
          // Obtener menús del usuario y abrir modal para elegir
          this.http
            .get<any[]>(environment.apiUrl + '/api/menus', options)
            .subscribe({
              next: (menus) => {
                // Acepta user_id, usuario_id o userId
                const menusUsuario = menus.filter(
                  (m: any) =>
                    m.user_id == user.id ||
                    m.usuario_id == user.id ||
                    m.userId == user.id
                );
                if (!menusUsuario.length) {
                  this.mostrarModalInfo(
                    'Aún no tienes ningún menú, por favor crea uno'
                  );
                  return;
                }
                // Abrir modal para elegir menú
                const dialogRef = this.dialog.open(ElegirMenuComponent, {
                  width: '350px',
                  data: { menus: menusUsuario },
                });
                dialogRef.afterClosed().subscribe((menuIdElegido) => {
                  if (menuIdElegido) {
                    // Aquí se añade la receta al menú seleccionado
                    this.postMenuReceta(menuIdElegido, recetaId, user.id);
                  }
                });
              },
              error: () =>
                this.mostrarModalInfo(
                  'Error al comprobar los menús del usuario.'
                ),
            });
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
    this.http.get<any[]>(environment.apiUrl + '/api/menus', options).subscribe({
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
          .get<any[]>(
            `${environment.apiUrl}/api/menus/${menuMasReciente.id_menu}/recetas`,
            options
          )
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
        environment.apiUrl + '/api/menuReceta',
        {
          usuario_id: usuarioId,
          receta_id: Number(recetaId),
          menu_id: Number(menuId), // <-- Enviamos el menú seleccionado
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
      width: '500px', // Ancho clásico, más compacto
      maxWidth: '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí podrías enviar la receta al backend
        // this.http.post(environment.apiUrl + '/recetas', result).subscribe(...)
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

  filtrarPorTipoComida(id_tipo: number | null) {
    this.tipoComidaSeleccionado = id_tipo;
    this.aplicarFiltrosAcumulados();
  }

  filtrarPorCategoria(id_categoria: number | null) {
    this.categoriaSeleccionada = id_categoria;
    this.aplicarFiltrosAcumulados();
  }

  aplicarFiltrosAcumulados() {
    let recetasFiltradas = [...this.recetasOriginales];
    // Filtrar por categoría si está seleccionada
    if (this.categoriaSeleccionada !== null) {
      recetasFiltradas = recetasFiltradas.filter((receta) =>
        Array.isArray(receta.categorias)
          ? receta.categorias.some(
              (c: any) => c.id_categoria === this.categoriaSeleccionada
            )
          : receta.id_categoria === this.categoriaSeleccionada
      );
    }
    // Filtrar por tiempo de comida si está seleccionado
    if (this.tipoComidaSeleccionado !== null) {
      recetasFiltradas = recetasFiltradas.filter((receta) =>
        receta.tiempos_comida?.some?.(
          (t: any) => t.id_tipo === this.tipoComidaSeleccionado
        )
      );
    }
    // Filtrar por búsqueda si hay texto
    const texto = this.busquedaReceta.trim().toLowerCase();
    if (texto.length > 0) {
      recetasFiltradas = recetasFiltradas.filter((receta) =>
        receta.nombre.toLowerCase().includes(texto)
      );
    }
    this.recetas = recetasFiltradas;
    this.recetasMostradas = 6;
  }

  // Nuevo método para filtrar recetas por nombre
  onBuscarReceta() {
    const texto = this.busquedaReceta.trim().toLowerCase();
    let recetasFiltradas = [...this.recetasOriginales];
    // Aplicar filtros existentes
    if (this.tipoComidaSeleccionado !== null) {
      recetasFiltradas = recetasFiltradas.filter((receta) =>
        receta.tiempos_comida?.some?.(
          (t: any) => t.id_tipo === this.tipoComidaSeleccionado
        )
      );
    }
    if (this.categoriaSeleccionada !== null) {
      recetasFiltradas = recetasFiltradas.filter((receta) =>
        Array.isArray(receta.categorias)
          ? receta.categorias.some(
              (c: any) => c.id_categoria === this.categoriaSeleccionada
            )
          : receta.id_categoria === this.categoriaSeleccionada
      );
    }
    // Filtrar por nombre
    if (texto.length > 0) {
      recetasFiltradas = recetasFiltradas.filter((receta) =>
        receta.nombre.toLowerCase().includes(texto)
      );
    }
    this.recetas = recetasFiltradas;
    this.recetasMostradas = 6;
  }
}
