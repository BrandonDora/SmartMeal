import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SubirFotoComponent } from './subir-foto.component';

@Component({
  selector: 'app-cambiar-foto',
  standalone: true,
  imports: [MatDialogModule, SubirFotoComponent],
  template: `
    <div class="dialog-content">
      <h2 mat-dialog-title class="titulo-dialogo">
        ¿Quieres cambiar la foto de perfil?
      </h2>
      <div mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>No</button>
        <button mat-raised-button color="primary" [mat-dialog-close]="true">
          Sí
        </button>
      </div>
    </div>
  `,
  styleUrl: './cambiar-foto.component.scss',
})
export class CambiarFotoComponent {}
