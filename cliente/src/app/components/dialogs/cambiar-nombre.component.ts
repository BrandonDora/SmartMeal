import { Component, Inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cambiar-nombre',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule],
  template: `
    <div class="dialog-content">
      <h2 mat-dialog-title class="titulo-dialogo">Cambiar nombre:</h2>
      <form (ngSubmit)="cambiarNombre()">
        <input
          type="text"
          [(ngModel)]="nuevoNombre"
          name="nuevoNombre"
          class="form-control"
          placeholder="Nuevo nombre"
          required
          maxlength="50"
          style="margin-bottom: 18px;"
        />
      </form>
      <div mat-dialog-actions align="end">
        <button mat-button (click)="dialogRef.close()">Cancelar</button>
        <button
          mat-raised-button
          color="primary"
          (click)="cambiarNombre()"
          [disabled]="!nuevoNombre || !nuevoNombre.trim()"
        >
          Cambiar
        </button>
      </div>
    </div>
  `,
  styleUrl: './cambiar-nombre.component.scss',
})
export class CambiarNombreComponent {
  nuevoNombre: string;
  constructor(
    public dialogRef: MatDialogRef<CambiarNombreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombreActual: string }
  ) {
    this.nuevoNombre = data.nombreActual || '';
  }

  cambiarNombre() {
    if (this.nuevoNombre.trim()) {
      this.dialogRef.close(this.nuevoNombre.trim());
    }
  }
}
