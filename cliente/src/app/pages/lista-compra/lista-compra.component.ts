import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpTokenService } from '../../http-token.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

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

  constructor(private tokenService: HttpTokenService) {}

  ngOnInit(): void {
    this.tokenService.getUser().subscribe({
      next: (data) => {
        if (data.foto_perfil && data.foto_perfil.trim() !== '') {
          this.fotoPerfilUrl = data.foto_perfil.startsWith('/storage/')
            ? environment.apiUrl.replace(/\/api$/, '') + data.foto_perfil
            : data.foto_perfil;
        } else {
          this.fotoPerfilUrl = 'assets/img/default.jpg';
        }
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
              return;
            }
            // Obtener todas las recetas de todos los menús del usuario
            const allMenuIds = menusUsuario.map((m: any) => m.id_menu);
            let allRecetaIds: number[] = [];
            let pendingMenus = allMenuIds.length;
            if (pendingMenus === 0) {
              this.ingredientesLista = [];
              this.cargandoLista = false;
              return;
            }
            allMenuIds.forEach((menuId: number) => {
              this.tokenService.getMenuRecetas(menuId).subscribe({
                next: (recetasIds: number[]) => {
                  allRecetaIds.push(...recetasIds);
                  pendingMenus--;
                  if (pendingMenus === 0) {
                    if (!allRecetaIds.length) {
                      this.ingredientesLista = [];
                      this.cargandoLista = false;
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
                            return;
                          }
                          // Obtener todos los ingredientes únicos
                          const idsIngredientes = [
                            ...new Set(
                              relaciones.map((r: any) => r.id_ingrediente)
                            ),
                          ];
                          this.tokenService
                            .getIngredientesByIds(idsIngredientes)
                            .subscribe({
                              next: (ingredientes) => {
                                // Unir info: para cada relación, mostrar nombre, cantidad y unidad
                                this.ingredientesLista = relaciones.map(
                                  (rel: any) => {
                                    const ing = ingredientes.find(
                                      (i: any) =>
                                        i.id_ingrediente ===
                                          rel.id_ingrediente ||
                                        i.id === rel.id_ingrediente
                                    );
                                    return {
                                      nombre: ing?.nombre || 'Ingrediente',
                                      cantidad: rel.cantidad,
                                      unidad: ing?.unidad || '',
                                    };
                                  }
                                );
                                this.cargandoLista = false;
                              },
                              error: () => {
                                this.ingredientesLista = [];
                                this.cargandoLista = false;
                              },
                            });
                        },
                        error: () => {
                          this.ingredientesLista = [];
                          this.cargandoLista = false;
                        },
                      });
                  }
                },
                error: () => {
                  pendingMenus--;
                  if (pendingMenus === 0) {
                    this.ingredientesLista = [];
                    this.cargandoLista = false;
                  }
                },
              });
            });
          },
          error: () => {
            this.ingredientesLista = [];
            this.cargandoLista = false;
          },
        });
        // --- FIN LISTA DE COMPRA ---
      },
      error: () => {
        this.fotoPerfilUrl = 'assets/img/default.jpg';
      },
    });
  }
}
