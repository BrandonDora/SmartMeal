import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  template: `
    <div class="dialog-content">
      <h2 mat-dialog-title class="titulo-dialogo">Aviso</h2>
      <h4 class="mensaje-principal mb-3">{{ data.mensaje }}</h4>
      <div mat-dialog-actions align="end">
        <button mat-button (click)="dialogRef.close()">Cerrar</button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-content {
        padding: 18px;
      }
      .titulo-dialogo {
        color: #bbd43e;
        font-weight: bold;
        text-align: center;
        font-size: 1.2rem;
        margin-bottom: 12px;
      }
      .mensaje-principal {
        color: #222;
        text-align: center;
      }
      button[mat-button] {
        background: #e53935;
        color: #fff;
        border-radius: 25px;
        font-weight: bold;
        padding: 8px 32px;
        border: none;
        margin-top: 10px;
      }
      button[mat-button]:hover {
        background: #b71c1c;
        color: #fff;
      }
    `,
  ],
})
export class ModalInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {}
}
