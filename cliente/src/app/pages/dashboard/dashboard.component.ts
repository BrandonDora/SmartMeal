import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { HttpTokenService } from '../../http-token.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { CrearMenuModalComponent } from '../../components/dialogs/crear-menu-modal.component';

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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  usuario: string = '';
  menus: any[] = [];
  recetasMenu: any[] = [];
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

  constructor(private tokenService: HttpTokenService) {}

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
      next: (menus) => {
        this.menus = menus;
        console.log('MENUS DESDE API:', menus);
        if (menus && menus.length > 0) {
          const ultimoMenu = menus[menus.length - 1];
          const idMenu = ultimoMenu.id_menu;
          this.getMenuRecetas(idMenu);
        }
      },
      error: (err) => {
        console.error('Error al obtener menús', err);
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
    this.totalesMenu = totales;
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
                if (
                  receta.imagen &&
                  !receta.imagen.startsWith('http') &&
                  !receta.imagen.startsWith('/storage/')
                ) {
                  return {
                    ...receta,
                    imagen:
                      'http://localhost:8000/storage/recetas/' + receta.imagen,
                  };
                } else if (
                  receta.imagen &&
                  receta.imagen.startsWith('/storage/')
                ) {
                  return {
                    ...receta,
                    imagen: 'http://localhost:8000' + receta.imagen,
                  };
                } else if (!receta.imagen) {
                  return {
                    ...receta,
                    imagen: 'assets/img/Desayuno.png',
                  };
                }
                return receta;
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
        this.menus.push(menu);
        this.cerrarCrearMenuModal();
      },
      error: (err) => {
        alert('Error al crear menú');
        console.error(err);
      },
    });
  }

  abrirVerReceta(receta: any) {
    // Aquí puedes abrir un modal, navegar o mostrar la receta como en recetas.component.ts
    // Por ejemplo, si tienes un modal de receta reutilizable:
    // this.dialog.open(VerRecetaComponent, { data: receta });
    // O simplemente navega a la vista de detalle:
    // this.router.navigate(['/recetas', receta.id_receta]);
  }

  abrirModalTerminar(receta: any) {
    this.recetaSeleccionadaTerminar = receta;
    this.mostrarModalTerminar = true;
  }

  cerrarModalTerminar() {
    this.mostrarModalTerminar = false;
    this.recetaSeleccionadaTerminar = null;
  }
}
