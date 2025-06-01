import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpTokenService } from '../../http-token.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AgregarIngredienteComponent } from '../../components/dialogs/agregar-ingrediente.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-compra',
  standalone: true,
  imports: [RouterModule, LogedHeaderComponent, FooterComponent, CommonModule],
  templateUrl: './lista-compra.component.html',
  styleUrl: './lista-compra.component.scss',
})
export class ListaCompraComponent implements OnInit {
  fotoPerfilUrl: string = 'assets/img/default.jpg';
  ingredientesLista: any[] = [];
  cargandoLista: boolean = false;
  todosIngredientes: any[] = [];

  constructor(
    private tokenService: HttpTokenService,
    private dialog: MatDialog,
    private http: HttpClient // Añadir HttpClient
  ) {}

  ngOnInit(): void {
    // --- CARGA ORIGINAL DE LA LISTA DE COMPRA ---
    this.tokenService.getUser().subscribe({
      next: (data) => {
        if (data.foto_perfil && data.foto_perfil.trim() !== '') {
          this.fotoPerfilUrl = data.foto_perfil.startsWith('/storage/')
            ? environment.apiUrl.replace(/\/api$/, '') + data.foto_perfil
            : data.foto_perfil;
        } else {
          this.fotoPerfilUrl = 'assets/img/default.jpg';
        }
        // Obtener todos los ingredientes para el modal (usando GET a /api/ingredientes)
        this.http
          .get<any[]>(
            environment.apiUrl.replace(/\/api$/, '') + '/api/ingredientes'
          )
          .subscribe({
            next: (ings) => {
              this.todosIngredientes = (ings || []).sort((a: any, b: any) =>
                a.nombre.localeCompare(b.nombre)
              );
            },
            error: () => {
              this.todosIngredientes = [];
            },
          });
        // --- INICIO LISTA DE COMPRA ---
        this.cargandoLista = true;
        this.tokenService.getMenus().subscribe({
          next: (menus) => {
            // Filtrar menús del usuario
            const menusUsuario = menus.filter(
              (m: any) =>
                m.user_id == data.id ||
                m.usuario_id == data.id ||
                m.userId == data.id
            );
            if (!menusUsuario.length) {
              this.ingredientesLista = [];
              this.cargandoLista = false;
              // Añadir ingredientes manuales si existen
              this.agregarIngredientesManuales();
              return;
            }
            // Obtener todas las recetas de todos los menús del usuario
            const allMenuIds = menusUsuario.map((m: any) => m.id_menu);
            let allRecetaIds: number[] = [];
            let pendingMenus = allMenuIds.length;
            if (pendingMenus === 0) {
              this.ingredientesLista = [];
              this.cargandoLista = false;
              this.agregarIngredientesManuales();
              return;
            }
            allMenuIds.forEach((menuId: number) => {
              this.tokenService.getMenuRecetas(menuId).subscribe({
                next: (recetasIds: number[]) => {
                  // Concatenar para permitir duplicados (una receta puede estar en varios menús)
                  allRecetaIds = allRecetaIds.concat(recetasIds);
                  pendingMenus--;
                  if (pendingMenus === 0) {
                    if (!allRecetaIds.length) {
                      this.ingredientesLista = [];
                      this.cargandoLista = false;
                      this.agregarIngredientesManuales();
                      return;
                    }
                    // Obtener todas las relaciones receta-ingrediente
                    this.tokenService
                      .getRecetaIngredientesByRecetaIds(allRecetaIds)
                      .subscribe({
                        next: (relaciones) => {
                          if (!relaciones.length) {
                            this.ingredientesLista = [];
                            this.cargandoLista = false;
                            this.agregarIngredientesManuales();
                            return;
                          }
                          // 1. Contar cuántas veces aparece cada receta en allRecetaIds
                          const recetaCount: { [id: number]: number } = {};
                          allRecetaIds.forEach((id) => {
                            recetaCount[id] = (recetaCount[id] || 0) + 1;
                          });
                          // 2. Obtener todos los ingredientes únicos para info de nombre/unidad
                          const idsIngredientes = [
                            ...new Set(
                              relaciones.map((r: any) => r.id_ingrediente)
                            ),
                          ];
                          this.tokenService
                            .getIngredientesByIds(idsIngredientes)
                            .subscribe({
                              next: (ingredientes) => {
                                // 3. Sumar ingredientes por cada aparición de la receta
                                const acumulados: {
                                  [key: string]: {
                                    nombre: string;
                                    cantidad: number;
                                    unidad: string;
                                  };
                                } = {};
                                relaciones.forEach((rel: any) => {
                                  const ing = ingredientes.find(
                                    (i: any) =>
                                      i.id_ingrediente === rel.id_ingrediente ||
                                      i.id === rel.id_ingrediente
                                  );
                                  const clave = `${rel.id_ingrediente}_${
                                    ing?.unidad || ''
                                  }`;
                                  // Multiplica la cantidad por el número de veces que aparece la receta
                                  const veces = recetaCount[rel.id_receta] || 1;
                                  if (!acumulados[clave]) {
                                    acumulados[clave] = {
                                      nombre: ing?.nombre || 'Ingrediente',
                                      cantidad: 0,
                                      unidad: ing?.unidad || '',
                                    };
                                  }
                                  acumulados[clave].cantidad +=
                                    rel.cantidad * veces;
                                });
                                this.ingredientesLista =
                                  Object.values(acumulados);
                                this.cargandoLista = false;
                                this.agregarIngredientesManuales();
                              },
                              error: () => {
                                this.ingredientesLista = [];
                                this.cargandoLista = false;
                                this.agregarIngredientesManuales();
                              },
                            });
                        },
                        error: () => {
                          this.ingredientesLista = [];
                          this.cargandoLista = false;
                          this.agregarIngredientesManuales();
                        },
                      });
                  }
                },
                error: () => {
                  pendingMenus--;
                  if (pendingMenus === 0) {
                    this.ingredientesLista = [];
                    this.cargandoLista = false;
                    this.agregarIngredientesManuales();
                  }
                },
              });
            });
          },
          error: () => {
            this.ingredientesLista = [];
            this.cargandoLista = false;
            this.agregarIngredientesManuales();
          },
        });
        // --- FIN LISTA DE COMPRA ---
      },
      error: () => {
        this.fotoPerfilUrl = 'assets/img/default.jpg';
      },
    });
  }

  // Añade los ingredientes manuales persistentes a la lista visual
  agregarIngredientesManuales() {
    const manuales = localStorage.getItem('ingredientesListaManuales');
    if (manuales) {
      try {
        const arr = JSON.parse(manuales);
        arr.forEach((nuevo: any) => {
          // Si ya existe (por nombre y unidad), suma la cantidad
          const existente = this.ingredientesLista.find(
            (item: any) =>
              item.nombre === nuevo.nombre && item.unidad === nuevo.unidad
          );
          if (existente) {
            existente.cantidad += nuevo.cantidad;
          } else {
            this.ingredientesLista.push({ ...nuevo });
          }
        });
      } catch {}
    }
  }

  abrirAgregarIngrediente() {
    const ref = this.dialog.open(AgregarIngredienteComponent, {
      data: { ingredientes: this.todosIngredientes },
    });
    ref.afterClosed().subscribe((result) => {
      if (result && result.ingredienteId && result.cantidad) {
        // Buscar el ingrediente seleccionado
        const ing = this.todosIngredientes.find(
          (i: any) =>
            i.id_ingrediente === result.ingredienteId ||
            i.id === result.ingredienteId
        );
        if (ing) {
          // Si ya existe en la lista, suma la cantidad
          const existente = this.ingredientesLista.find(
            (item: any) =>
              item.nombre === ing.nombre && item.unidad === ing.unidad
          );
          if (existente) {
            existente.cantidad += result.cantidad;
          } else {
            this.ingredientesLista.push({
              nombre: ing.nombre,
              cantidad: result.cantidad,
              unidad: ing.unidad,
            });
          }
          // Guardar SOLO los ingredientes manuales en localStorage
          // 1. Leer los actuales
          let manuales = localStorage.getItem('ingredientesListaManuales');
          let arr = [];
          try {
            arr = manuales ? JSON.parse(manuales) : [];
          } catch {
            arr = [];
          }
          // 2. Si ya existe, suma la cantidad, si no, añade
          const idx = arr.findIndex(
            (item: any) =>
              item.nombre === ing.nombre && item.unidad === ing.unidad
          );
          if (idx !== -1) {
            arr[idx].cantidad += result.cantidad;
          } else {
            arr.push({
              nombre: ing.nombre,
              cantidad: result.cantidad,
              unidad: ing.unidad,
            });
          }
          localStorage.setItem(
            'ingredientesListaManuales',
            JSON.stringify(arr)
          );
        }
      }
    });
  }

  // Devuelve true si el ingrediente es manual (está en localStorage)
  esIngredienteManual(item: any): boolean {
    const manuales = localStorage.getItem('ingredientesListaManuales');
    if (!manuales) return false;
    try {
      const arr = JSON.parse(manuales);
      return arr.some(
        (i: any) => i.nombre === item.nombre && i.unidad === item.unidad
      );
    } catch {
      return false;
    }
  }

  // Reducir cantidad de un ingrediente manual
  reducirCantidadManual(item: any) {
    if (!this.esIngredienteManual(item)) return;
    // Reducir en 1 (o la unidad mínima que prefieras)
    if (item.cantidad > 1) {
      item.cantidad -= 1;
      // Actualizar en localStorage
      let manuales = localStorage.getItem('ingredientesListaManuales');
      let arr = [];
      try {
        arr = manuales ? JSON.parse(manuales) : [];
      } catch {
        arr = [];
      }
      const idx = arr.findIndex(
        (i: any) => i.nombre === item.nombre && i.unidad === item.unidad
      );
      if (idx !== -1) {
        arr[idx].cantidad = item.cantidad;
        localStorage.setItem('ingredientesListaManuales', JSON.stringify(arr));
      }
    } else {
      // Si la cantidad es 1, eliminar
      this.eliminarIngredienteManual(item);
    }
  }

  // Elimina cualquier ingrediente de la lista visual (manual o automático)
  eliminarIngredienteManual(item: any) {
    // Quitar de la lista visual
    this.ingredientesLista = this.ingredientesLista.filter(
      (i: any) => !(i.nombre === item.nombre && i.unidad === item.unidad)
    );
    // Si es manual, quitar también de localStorage
    const manuales = localStorage.getItem('ingredientesListaManuales');
    if (manuales) {
      let arr = [];
      try {
        arr = JSON.parse(manuales);
      } catch {
        arr = [];
      }
      const nuevoArr = arr.filter(
        (i: any) => !(i.nombre === item.nombre && i.unidad === item.unidad)
      );
      if (nuevoArr.length !== arr.length) {
        localStorage.setItem(
          'ingredientesListaManuales',
          JSON.stringify(nuevoArr)
        );
      }
    }
  }
}

// En el HTML, para cada ingrediente de la lista:
// <div *ngFor="let item of ingredientesLista">
//   {{ item.nombre }} ({{ item.cantidad }} {{ item.unidad }})
//   <button *ngIf="esIngredienteManual(item)" (click)="reducirCantidadManual(item)" class="btn btn-outline-secondary btn-sm mx-1" title="Restar 1">
//     <i class="bi bi-dash"></i>
//   </button>
//   <button *ngIf="esIngredienteManual(item)" (click)="eliminarIngredienteManual(item)" class="btn btn-outline-danger btn-sm" title="Eliminar">
//     <i class="bi bi-x"></i>
//   </button>
// </div>
// Puedes ajustar los estilos/clases según tu diseño Bootstrap o CSS.
