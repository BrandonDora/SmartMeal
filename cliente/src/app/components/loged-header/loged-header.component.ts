import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CambiarFotoComponent } from '../dialogs/cambiar-foto.component';

@Component({
  selector: 'app-loged-header',
  standalone: true,
  imports: [RouterModule, CommonModule, CambiarFotoComponent],
  templateUrl: './loged-header.component.html',
  styleUrl: './loged-header.component.scss',
})
export class LogedHeaderComponent {
  @Input() fotoPerfilUrl: string = 'assets/img/default.jpg';
  hover: string | null = null;
  constructor(public router: Router, private dialog: MatDialog) {}
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
        return 'http://localhost:8000' + this.fotoPerfilUrl;
      }
      return this.fotoPerfilUrl;
    }
    return 'assets/img/default.jpg';
  }
}
