import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elegir-menu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="dialog-content">
      <h2 mat-dialog-title>Elegir menú:</h2>
      <div mat-dialog-content>
        <select [(ngModel)]="menuSeleccionado" class="form-select w-100 mb-3">
          <option *ngFor="let menu of data.menus" [value]="menu.id_menu">
            {{ menu.nombre }}
          </option>
        </select>
      </div>
      <div mat-dialog-actions class="d-flex justify-content-end gap-2">
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button
          mat-flat-button
          color="primary"
          [disabled]="!menuSeleccionado"
          (click)="onElegir()"
        >
          Añadir
        </button>
      </div>
    </div>
  `,
  styleUrl: './elegir-menu.component.scss',
  styles: [':host { display: block; }'],
})
export class ElegirMenuComponent {
  menuSeleccionado: number | null = null;
  constructor(
    public dialogRef: MatDialogRef<ElegirMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { menus: any[] }
  ) {}

  onCancel() {
    this.dialogRef.close();
  }
  onElegir() {
    this.dialogRef.close(this.menuSeleccionado);
  }
}
