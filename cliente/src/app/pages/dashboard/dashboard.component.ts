import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { HttpTokenService } from '../../http-token.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { CrearMenuModalComponent } from '../../components/dialogs/crear-menu-modal.component';
import { VerRecetaComponent } from '../../components/dialogs/ver-receta.component';
import { MatDialog } from '@angular/material/dialog';
import { GenerarMenuModalComponent } from '../../components/dialogs/generar-menu-modal.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    LogedHeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    CrearMenuModalComponent,
    VerRecetaComponent,
    GenerarMenuModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  usuario: string = '';
  menus: any[] = [];
  recetasMenu: any[] = [];
  menusConRecetas: any[] = []; // [{ nombre: string, recetas: any[] }]
  prefs: any = null;
  mostrarCrearMenuModal: boolean = false;
  nuevoMenuNombre: string = '';
  mostrarFormularioMenu: boolean = false;
  nuevoMenu = { nombre: '', descripcion: '' };
  mostrarMsgGenerarMenu: boolean = false;
  fotoPerfilUrl: string = 'assets/img/default.jpg';
  mostrarModalTerminar: boolean = false;
  recetaSeleccionadaTerminar: any = null;
  totalesMenu = { calorias: 0, proteinas: 0, grasas: 0, carbohidratos: 0 };
  menuActivo: number | null = null;
  mostrarModalCambioMenu: boolean = false;
  menuPendienteActivar: number | null = null;
  mostrarModalEliminarMenu: boolean = false;
  mostrarModalEliminarMenuPaso2: boolean = false;
  menuPendienteEliminar: number | null = null;
  nombreMenuPendienteEliminar: string = '';

  proceso = {
    calorias: 0,
    proteinas: 0,
    carbohidratos: 0,
    grasas: 0,
  };
  recetasTerminadas: { [menuId: number]: number[] } = {};
  procesoPorMenu: {
    [menuId: number]: {
      calorias: number;
      proteinas: number;
      carbohidratos: number;
      grasas: number;
    };
  } = {};

  mostrarModalDesactivarMenu: boolean = false;
  mostrarGenerarMenuModal: boolean = false;
  categorias: any[] = [];

  constructor(
    private tokenService: HttpTokenService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.tokenService.getUser().subscribe({
      next: (data) => {
        // Mostrar user.nombre, o "{sin nombre}" si no existe
        this.usuario =
          data.nombre && data.nombre.trim() !== ''
            ? data.nombre
            : '{Sin nombre}';
        // Obtener la foto de perfil real
        if (data.foto_perfil && data.foto_perfil.trim() !== '') {
          this.fotoPerfilUrl = data.foto_perfil.startsWith('/storage/')
            ? environment.apiUrl.replace(/\/api$/, '') + data.foto_perfil
            : data.foto_perfil;
        } else {
          this.fotoPerfilUrl = 'assets/img/default.jpg';
        }
        console.log(data);
        // Obtener preferencias nutricionales del usuario
        if (data.id) {
          this.tokenService
            .getPreferenciasNutricionalesByUser(data.id)
            .subscribe({
              next: (prefs) => {
                this.prefs = prefs;
                console.log('Preferencias nutricionales:', prefs);
              },
              error: (err) => {
                console.error(
                  'Error al obtener preferencias nutricionales',
                  err
                );
              },
            });
        }
      },
      error: (err) => {
        console.error('Error al obtener usuario', err);
        this.usuario = '{sin nombre}';
      },
    });

    // Nueva llamada a /api/menus
    this.tokenService.getMenus().subscribe({
      next: async (menus) => {
        this.menus = menus;
        this.menusConRecetas = [];
        if (menus && menus.length > 0) {
          for (const menu of menus) {
            const ids: number[] = await new Promise((resolve, reject) => {
              this.tokenService.getMenuRecetas(menu.id_menu).subscribe({
                next: (ids) => resolve(ids),
                error: (err) => reject(err),
              });
            });
            let recetas: any[] = [];
            if (ids && ids.length > 0) {
              recetas = await new Promise((resolve, reject) => {
                this.tokenService.getRecetasByIds(ids).subscribe({
                  next: (recetas) => {
                    // Unificar lógica de imagen igual que en recetas.component.ts
                    const recetasProcesadas = recetas.map((receta: any) => {
                      let imagen = receta.imagen_url || receta.imagen;
                      if (!imagen || imagen.trim() === '') {
                        imagen =
                          'http://s3.us-east-1.amazonaws.com/smartmeal.imagenes/recetas/default.jpg';
                      } else if (imagen.startsWith('http')) {
                        // Usar la URL tal cual (S3 o externa)
                      } else {
                        imagen =
                          'http://s3.us-east-1.amazonaws.com/smartmeal.imagenes/recetas/' +
                          imagen;
                      }
                      return { ...receta, imagen };
                    });
                    resolve(recetasProcesadas);
                  },
                  error: (err) => reject(err),
                });
              });
            }
            this.menusConRecetas.push({
              id_menu: menu.id_menu,
              nombre: menu.nombre,
              recetas,
            });
          }
        }
      },
      error: (err) => {
        console.error('Error al obtener menús', err);
      },
    });

    // Leer menú activo de localStorage
    const menuActivoGuardado = localStorage.getItem('menuActivo');
    if (menuActivoGuardado) {
      this.menuActivo = Number(menuActivoGuardado);
      this.calcularTotalesMenu(this.menuActivo); // Calcular totales del menú activo al cargar
    } else {
      this.totalesMenu = {
        calorias: 0,
        proteinas: 0,
        grasas: 0,
        carbohidratos: 0,
      };
    }

    // Leer recetas terminadas por menú de localStorage
    const terminadasGuardadas = localStorage.getItem('recetasTerminadas');
    if (terminadasGuardadas) {
      try {
        this.recetasTerminadas = JSON.parse(terminadasGuardadas);
      } catch {
        this.recetasTerminadas = {};
      }
    }
    // Leer progreso por menú de localStorage
    const progresoGuardado = localStorage.getItem('progresoMenu');
    if (progresoGuardado) {
      try {
        this.procesoPorMenu = JSON.parse(progresoGuardado);
      } catch {
        this.procesoPorMenu = {};
      }
    }
    // Al iniciar, si hay menú activo, cargar su progreso y recetas terminadas
    if (this.menuActivo !== null) {
      this.proceso = this.procesoPorMenu[this.menuActivo] || {
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
      };
    } else {
      this.proceso = { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 };
    }

    // Obtener categorías para el modal de generar menú
    this.http
      .get<any[]>(environment.apiUrl.replace(/\/api$/, '') + '/api/categorias')
      .subscribe({
        next: (data) => {
          this.categorias = data.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
          );
        },
        error: () => {
          this.categorias = [];
        },
      });
  }

  async calcularTotalesMenu(idMenu: number) {
    // 1. Obtener ids de recetas del menú
    const idsRecetas: number[] = await new Promise((resolve, reject) => {
      this.tokenService.getMenuRecetas(idMenu).subscribe({
        next: (ids) => resolve(ids),
        error: (err) => reject(err),
      });
    });
    if (!idsRecetas.length) {
      this.totalesMenu = {
        calorias: 0,
        proteinas: 0,
        grasas: 0,
        carbohidratos: 0,
      };
      return;
    }
    // 2. Obtener ingredientes y cantidades de cada receta
    const recetaIngredientes: any[] = await new Promise((resolve, reject) => {
      this.tokenService.getRecetaIngredientesByRecetaIds(idsRecetas).subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
    // 3. Obtener ids únicos de ingredientes
    const idsIngredientes = [
      ...new Set(recetaIngredientes.map((ri) => ri.id_ingrediente)),
    ];
    // 4. Obtener info nutricional de ingredientes
    const ingredientes: any[] = await new Promise((resolve, reject) => {
      this.tokenService.getIngredientesByIds(idsIngredientes).subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
    // 5. Calcular totales por receta y sumatorio final
    let totales = { calorias: 0, proteinas: 0, grasas: 0, carbohidratos: 0 };
    for (const ri of recetaIngredientes) {
      const ing = ingredientes.find(
        (i) => i.id_ingrediente === ri.id_ingrediente
      );
      if (!ing) continue;
      totales.calorias += ing.calorias * ri.cantidad;
      totales.proteinas += ing.proteinas * ri.cantidad;
      totales.grasas += ing.grasas * ri.cantidad;
      totales.carbohidratos += ing.carbohidratos * ri.cantidad;
    }
    // Redondear los totales
    this.totalesMenu = {
      calorias: Math.round(totales.calorias),
      proteinas: Math.round(totales.proteinas),
      grasas: Math.round(totales.grasas),
      carbohidratos: Math.round(totales.carbohidratos),
    };
    // Imprimir por consola los valores de cada receta
    for (const ri of recetaIngredientes) {
      const ing = ingredientes.find(
        (i) => i.id_ingrediente === ri.id_ingrediente
      );
      if (!ing) continue;
      console.log(
        `RecetaID: ${ri.id_receta}\n` +
          `IngredienteID: ${ri.id_ingrediente}\n` +
          `Cantidad: ${ri.cantidad}\n` +
          `Calorías: ${(ing.calorias * ri.cantidad).toFixed(2)}\n` +
          `Proteínas: ${(ing.proteinas * ri.cantidad).toFixed(2)}\n` +
          `Grasas: ${(ing.grasas * ri.cantidad).toFixed(2)}\n` +
          `Carbohidratos: ${(ing.carbohidratos * ri.cantidad).toFixed(2)}\n---`
      );
    }
  }

  getMenuRecetas(idMenu: number) {
    this.tokenService.getMenuRecetas(idMenu).subscribe({
      next: (ids: number[]) => {
        if (ids && ids.length > 0) {
          this.tokenService.getRecetasByIds(ids).subscribe({
            next: (recetas) => {
              // Procesar la ruta de la imagen igual que en recetas.component.ts
              this.recetasMenu = recetas.map((receta: any) => {
                let imagen = receta.imagen_url || receta.imagen;
                if (!imagen || imagen.trim() === '') {
                  imagen =
                    'http://s3.us-east-1.amazonaws.com/smartmeal.imagenes/recetas/default.jpg';
                } else if (imagen.startsWith('http')) {
                  // Usar la URL tal cual (S3 o externa)
                } else {
                  imagen =
                    'http://s3.us-east-1.amazonaws.com/smartmeal.imagenes/recetas/' +
                    imagen;
                }
                return { ...receta, imagen };
              });
              console.log('RECETAS DEL MENÚ:', this.recetasMenu);
              this.calcularTotalesMenu(idMenu); // <-- Llama al cálculo de totales
            },
            error: (err) => {
              console.error('Error al obtener recetas por IDs', err);
            },
          });
        } else {
          this.recetasMenu = [];
        }
      },
      error: (err) => {
        console.error('Error al obtener IDs de recetas del menú', err);
      },
    });
  }

  abrirCrearMenuModal() {
    this.mostrarCrearMenuModal = true;
  }

  cerrarCrearMenuModal() {
    this.mostrarCrearMenuModal = false;
  }

  onCrearMenu(event: { nombre: string }) {
    if (!event.nombre.trim()) return;
    this.tokenService.crearMenu(event.nombre).subscribe({
      next: (menu) => {
        // Refrescar la lista de menús desde el backend para asegurar consistencia
        this.tokenService.getMenus().subscribe({
          next: async (menus) => {
            this.menus = menus;
            this.menusConRecetas = [];
            if (menus && menus.length > 0) {
              for (const menu of menus) {
                const recetas = await new Promise<any[]>((resolve) => {
                  this.tokenService.getMenuRecetas(menu.id_menu).subscribe({
                    next: (ids: number[]) => {
                      if (ids && ids.length > 0) {
                        this.tokenService.getRecetasByIds(ids).subscribe({
                          next: (recetas) => resolve(recetas),
                          error: () => resolve([]),
                        });
                      } else {
                        resolve([]);
                      }
                    },
                    error: () => resolve([]),
                  });
                });
                this.menusConRecetas.push({
                  id_menu: menu.id_menu,
                  nombre: menu.nombre,
                  recetas,
                });
              }
            }
            // Cerrar modal y forzar doble refresco visual
            this.cerrarCrearMenuModal();
            setTimeout(() => {
              // Primer refresco visual (Angular detecta cambios)
              this.menus = [...this.menus];
              this.menusConRecetas = [...this.menusConRecetas];
              setTimeout(() => {
                // Segundo refresco visual (por si acaso)
                this.menus = [...this.menus];
                this.menusConRecetas = [...this.menusConRecetas];
              }, 100);
            }, 100);
          },
          error: (err) => {
            alert('Error al refrescar menús');
            this.cerrarCrearMenuModal();
          },
        });
      },
      error: (err) => {
        alert('Error al crear menú');
        console.error(err);
      },
    });
  }

  abrirVerReceta(receta: any) {
    this.dialog.open(VerRecetaComponent, {
      width: '600px',
      data: receta,
    });
  }

  abrirModalTerminar(receta: any) {
    this.recetaSeleccionadaTerminar = receta;
    this.mostrarModalTerminar = true;
  }

  cerrarModalTerminar() {
    this.mostrarModalTerminar = false;
    this.recetaSeleccionadaTerminar = null;
  }

  terminarReceta() {
    if (!this.recetaSeleccionadaTerminar || this.menuActivo === null) return;
    const receta = this.recetaSeleccionadaTerminar;
    const menuId = this.menuActivo;
    if (!this.recetasTerminadas[menuId]) {
      this.recetasTerminadas[menuId] = [];
    }
    if (!this.recetasTerminadas[menuId].includes(receta.id_receta)) {
      this.recetasTerminadas[menuId].push(receta.id_receta);
      localStorage.setItem(
        'recetasTerminadas',
        JSON.stringify(this.recetasTerminadas)
      );
      if (!this.procesoPorMenu[menuId]) {
        this.procesoPorMenu[menuId] = {
          calorias: 0,
          proteinas: 0,
          carbohidratos: 0,
          grasas: 0,
        };
      }
      this.procesoPorMenu[menuId].calorias += receta.calorias || 0;
      this.procesoPorMenu[menuId].proteinas += receta.proteinas || 0;
      this.procesoPorMenu[menuId].carbohidratos += receta.carbohidratos || 0;
      this.procesoPorMenu[menuId].grasas += receta.grasas || 0;
      // Redondear los valores de progreso
      this.procesoPorMenu[menuId].calorias = Math.round(
        this.procesoPorMenu[menuId].calorias
      );
      this.procesoPorMenu[menuId].proteinas = Math.round(
        this.procesoPorMenu[menuId].proteinas
      );
      this.procesoPorMenu[menuId].carbohidratos = Math.round(
        this.procesoPorMenu[menuId].carbohidratos
      );
      this.procesoPorMenu[menuId].grasas = Math.round(
        this.procesoPorMenu[menuId].grasas
      );
      localStorage.setItem('progresoMenu', JSON.stringify(this.procesoPorMenu));
      this.proceso = { ...this.procesoPorMenu[menuId] };
    }
    this.cerrarModalTerminar();
  }

  esRecetaTerminada(receta: any, menuId?: number): boolean {
    // Si no se pasa menuId, usa el menú activo (retrocompatibilidad)
    const idMenu = menuId !== undefined ? menuId : this.menuActivo;
    if (idMenu === null) return false;
    return (
      this.recetasTerminadas[idMenu] &&
      this.recetasTerminadas[idMenu].includes(receta.id_receta)
    );
  }

  activarMenu(id_menu: number) {
    // Solo reiniciar barras visuales, NO progreso ni recetas terminadas aquí
    this.proceso = this.procesoPorMenu[id_menu] || {
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0,
    };

    if (this.menuActivo === id_menu) {
      this.mostrarModalDesactivarMenu = true;
      return;
    }
    this.menuActivo = id_menu;
    localStorage.setItem('menuActivo', String(id_menu));
    this.calcularTotalesMenu(id_menu);
  }

  abrirModalDesactivarMenu() {
    this.mostrarModalDesactivarMenu = true;
  }

  cerrarModalDesactivarMenu() {
    this.mostrarModalDesactivarMenu = false;
  }

  desactivarMenu() {
    // Solo cerrar el modal, NO resetear nada aquí
    this.cerrarModalDesactivarMenu();
  }

  confirmarDesactivarMenu() {
    // Al confirmar, resetea progreso y recetas terminadas de TODOS los menús
    // Incluido el menú activo (el más importante)
    // Reinicia también los valores nutricionales
    // Recorrer todos los menús conocidos
    for (const menu of this.menus) {
      this.procesoPorMenu[menu.id_menu] = {
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
      };
      this.recetasTerminadas[menu.id_menu] = [];
    }
    localStorage.setItem('progresoMenu', JSON.stringify(this.procesoPorMenu));
    localStorage.setItem(
      'recetasTerminadas',
      JSON.stringify(this.recetasTerminadas)
    );
    // Desactivar menú activo
    this.menuActivo = null;
    localStorage.removeItem('menuActivo');
    // Reiniciar totales y progreso visual
    this.totalesMenu = {
      calorias: 0,
      proteinas: 0,
      grasas: 0,
      carbohidratos: 0,
    };
    this.proceso = {
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0,
    };
    // Cerrar modal
    this.mostrarModalDesactivarMenu = false;
    // Forzar refresco visual de Angular
    this.menus = [...this.menus];
    this.menusConRecetas = [...this.menusConRecetas];
  }

  confirmarCambioMenu() {
    if (this.menuPendienteActivar !== null) {
      this.menuActivo = this.menuPendienteActivar;
      localStorage.setItem('menuActivo', String(this.menuPendienteActivar));
      this.calcularTotalesMenu(this.menuPendienteActivar);
      this.proceso = this.procesoPorMenu[this.menuPendienteActivar] || {
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
      };
    }
    this.mostrarModalCambioMenu = false;
    this.menuPendienteActivar = null;
  }

  cancelarCambioMenu() {
    this.mostrarModalCambioMenu = false;
    this.menuPendienteActivar = null;
  }

  abrirModalEliminarMenu(menu: any) {
    this.menuPendienteEliminar = menu.id_menu;
    this.nombreMenuPendienteEliminar = menu.nombre;
    this.mostrarModalEliminarMenu = true;
  }

  cancelarEliminarMenu() {
    this.mostrarModalEliminarMenu = false;
    this.menuPendienteEliminar = null;
    this.nombreMenuPendienteEliminar = '';
  }

  confirmarPrimerPasoEliminarMenu() {
    this.mostrarModalEliminarMenu = false;
    this.mostrarModalEliminarMenuPaso2 = true;
  }

  cancelarEliminarMenuPaso2() {
    this.mostrarModalEliminarMenuPaso2 = false;
    this.menuPendienteEliminar = null;
    this.nombreMenuPendienteEliminar = '';
  }

  eliminarMenuDefinitivo() {
    if (this.menuPendienteEliminar !== null) {
      this.tokenService.eliminarMenu(this.menuPendienteEliminar).subscribe({
        next: () => {
          // Eliminar el menú de la lista local
          this.menus = this.menus.filter(
            (m) => m.id_menu !== this.menuPendienteEliminar
          );
          this.menusConRecetas = this.menusConRecetas.filter(
            (m) => m.id_menu !== this.menuPendienteEliminar
          );
          // Si era el menú activo, limpiar
          if (this.menuActivo === this.menuPendienteEliminar) {
            this.menuActivo = null;
            localStorage.removeItem('menuActivo');
            this.totalesMenu = {
              calorias: 0,
              proteinas: 0,
              grasas: 0,
              carbohidratos: 0,
            };
          }
          this.cancelarEliminarMenuPaso2();
        },
        error: () => {
          alert('Error al eliminar el menú');
          this.cancelarEliminarMenuPaso2();
        },
      });
    }
  }

  abrirGenerarMenu(): void {
    if (this.prefs && this.prefs.length > 0) {
      this.mostrarGenerarMenuModal = true;
      this.mostrarMsgGenerarMenu = true;
    } else {
      this.mostrarMsgGenerarMenu = true;
      this.mostrarGenerarMenuModal = false;
    }
  }

  cerrarGenerarMenuModal(): void {
    this.mostrarGenerarMenuModal = false;
    this.mostrarMsgGenerarMenu = false;
  }

  onGenerarMenu(event: { nombre: string; categoria: number[] }): void {
    if (
      !event ||
      !event.nombre ||
      !event.categoria ||
      event.categoria.length === 0
    ) {
      this.cerrarGenerarMenuModal();
      return;
    }
    const token = localStorage.getItem('token');
    this.http
      .post<any>(
        environment.apiUrl.replace(/\/$/, '') + '/api/generar-menu-categorias',
        {
          nombre: event.nombre,
          categorias: event.categoria,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .subscribe({
        next: (resp) => {
          // Refrescar menús tras crear
          this.tokenService.getMenus().subscribe({
            next: async (menus) => {
              this.menus = menus;
              this.menusConRecetas = [];
              if (menus && menus.length > 0) {
                for (const menu of menus) {
                  const recetas = await new Promise<any[]>((resolve) => {
                    this.tokenService.getMenuRecetas(menu.id_menu).subscribe({
                      next: (ids: number[]) => {
                        if (ids && ids.length > 0) {
                          this.tokenService.getRecetasByIds(ids).subscribe({
                            next: (recetas) => resolve(recetas),
                            error: () => resolve([]),
                          });
                        } else {
                          resolve([]);
                        }
                      },
                      error: () => resolve([]),
                    });
                  });
                  this.menusConRecetas.push({
                    id_menu: menu.id_menu,
                    nombre: menu.nombre,
                    recetas,
                  });
                }
              }
              this.menus = [...this.menus];
              this.menusConRecetas = [...this.menusConRecetas];
            },
            error: () => {},
          });
          this.cerrarGenerarMenuModal();
        },
        error: (err) => {
          alert('Error al generar menú');
          this.cerrarGenerarMenuModal();
        },
      });
  }
}
