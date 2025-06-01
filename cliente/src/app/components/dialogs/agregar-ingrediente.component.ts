import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-ingrediente',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule],
  template: `
    <div class="dialog-content">
      <h2 class="titulo-dialogo">Añadir ingrediente</h2>
      <form (ngSubmit)="agregar()">
        <div class="mb-3">
          <label for="ingredienteSelect" class="form-label">Ingrediente</label>
          <select
            id="ingredienteSelect"
            class="form-select"
            [(ngModel)]="ingredienteId"
            name="ingredienteId"
            required
          >
            <option [ngValue]="null" disabled>--Ingrediente--</option>
            <option *ngFor="let ing of ingredientes" [ngValue]="ing.id">
              {{ ing.nombre }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="cantidadInput" class="form-label">
            Cantidad <span>({{ tipo }})</span>
          </label>
          <input
            id="cantidadInput"
            type="number"
            class="form-control"
            [(ngModel)]="cantidad"
            name="cantidad"
            min="1"
            required
          />
        </div>
        <div class="d-flex justify-content-end gap-2 mt-4">
          <button mat-button type="button" (click)="dialogRef.close()">
            Cancelar
          </button>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="!ingredienteId || !cantidad || cantidad <= 0"
          >
            Añadir
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrl: './agregar-ingrediente.component.scss',
})
export class AgregarIngredienteComponent {
  ingredienteId: number | null = null;
  cantidad: number | null = null;
  ingredientes: any[] = [];
  get tipo(): string {
    const ing = this.ingredientes.find((i) => i.id === this.ingredienteId);
    // Si no hay ingrediente seleccionado, mostrar 'unidad' de ejemplo para debug
    return ing ? ing.unidad : 'unidad';
  }

  constructor(
    public dialogRef: MatDialogRef<AgregarIngredienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ingredientes: any[] }
  ) {
    // Limpio: sin alerts
    this.ingredientes = (data.ingredientes || []).map((ing: any) => ({
      id: ing.id_ingrediente !== undefined ? ing.id_ingrediente : ing.id,
      nombre: ing.nombre,
      unidad: ing.unidad || '',
    }));
  }

  agregar() {
    if (this.ingredienteId && this.cantidad && this.cantidad > 0) {
      this.dialogRef.close({
        ingredienteId: this.ingredienteId,
        cantidad: this.cantidad,
      });
    }
  }
}
