import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { HttpTokenService } from '../../http-token.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    LogedHeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  usuario: string = '';
  menus: any[] = [];
  recetasMenu: any[] = [];
  prefs: any = null;
  showCrearMenuModal: boolean = false;
  nuevoMenuNombre: string = '';
  mostrarFormularioMenu: boolean = false;
  nuevoMenu = { nombre: '', descripcion: '' };
  mostrarMsgGenerarMenu: boolean = false;
  fotoPerfilUrl: string = 'assets/img/default.jpg';

  constructor(private tokenService: HttpTokenService) {}

  ngOnInit(): void {
    this.tokenService.getUser().subscribe({
      next: (data) => {
        this.usuario = data.usuario || data.name || 'Usuario';
        // Obtener la foto de perfil real
        if (data.foto_perfil && data.foto_perfil.trim() !== '') {
          this.fotoPerfilUrl = data.foto_perfil.startsWith('/storage/')
            ? 'http://localhost:8000' + data.foto_perfil
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
        this.usuario = 'Usuario';
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

  getMenuRecetas(idMenu: number) {
    this.tokenService.getMenuRecetas(idMenu).subscribe({
      next: (ids: number[]) => {
        if (ids && ids.length > 0) {
          this.tokenService.getRecetasByIds(ids).subscribe({
            next: (recetas) => {
              this.recetasMenu = recetas;
              console.log('RECETAS DEL MENÚ:', recetas);
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

  crearMenu() {
    if (!this.nuevoMenu.nombre.trim()) return;
    this.tokenService.crearMenu(this.nuevoMenu.nombre).subscribe({
      next: (menu) => {
        this.menus.push(menu);
        this.mostrarFormularioMenu = false;
        this.nuevoMenu = { nombre: '', descripcion: '' };
      },
      error: (err) => {
        alert('Error al crear menú');
        console.error(err);
      },
    });
  }
}
