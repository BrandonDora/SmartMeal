import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CambiarFotoComponent } from '../dialogs/cambiar-foto.component';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loged-header',
  standalone: true,
  imports: [RouterModule, CommonModule, CambiarFotoComponent, FormsModule],
  templateUrl: './loged-header.component.html',
  styleUrl: './loged-header.component.scss',
})
export class LogedHeaderComponent {
  @Input() fotoPerfilUrl: string = 'assets/img/default.jpg';
  @Output() buscarRecetaHeader = new EventEmitter<string>();
  busquedaReceta: string = '';
  hover: string | null = null;
  mostrarMenu = false;
  isMobile = false;
  navItems = [
    { label: 'Mi Plan', link: '/dashboard' },
    { label: 'Recetas', link: '/recetas' },
    { label: 'Calculadora', link: '/calculadora' },
    { label: 'Lista de Compras', link: '/listaCompra' },
  ];

  constructor(public router: Router, private dialog: MatDialog) {
    // Detectar si es móvil
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
  }

  setHover(route: string | null) {
    this.hover = route;
  }

  abrirDialogoCambiarFoto() {
    const dialogRef = this.dialog.open(CambiarFotoComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí podrías emitir un evento o recargar la foto si es necesario
        window.location.reload(); // Simple recarga para reflejar el cambio
      }
    });
  }

  get fotoPerfilUrlCompleta(): string {
    if (this.fotoPerfilUrl && this.fotoPerfilUrl.trim() !== '') {
      if (this.fotoPerfilUrl.startsWith('/storage/')) {
        return environment.apiUrl.replace(/\/api$/, '') + this.fotoPerfilUrl;
      }
      return this.fotoPerfilUrl;
    }
    return 'assets/img/default.jpg';
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 700;
    if (!this.isMobile) {
      this.mostrarMenu = false;
    }
  }

  buscarReceta() {
    this.buscarRecetaHeader.emit(this.busquedaReceta);
  }
}
