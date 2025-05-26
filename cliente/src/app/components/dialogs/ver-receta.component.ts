import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-receta',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  template: `
    <div class="dialog-content">
      <h2 mat-dialog-title class="titulo-dialogo">{{ data.nombre }}</h2>
      <img
        [src]="data.imagen"
        alt="Imagen receta"
        class="img-fluid rounded mb-3"
        style="max-height:220px; object-fit:cover; width:100%;"
      />
      <div class="mb-2"><b>Descripción:</b> {{ data.descripcion }}</div>
      <div class="mb-2">
        <b>Instrucciones:</b> <br /><span style="white-space: pre-line">{{
          data.instrucciones
        }}</span>
      </div>
      <div class="d-flex justify-content-around mt-4 mb-2">
        <div class="nutrient">
          <i class="bi bi-egg-fried"></i> <b>Proteínas:</b>
          {{ data.proteinas }}g
        </div>
        <div class="nutrient">
          <i class="bi bi-cup-straw"></i> <b>Carbohidratos:</b>
          {{ data.carbohidratos }}g
        </div>
        <div class="nutrient">
          <i class="bi bi-droplet-half"></i> <b>Grasas:</b> {{ data.grasas }}g
        </div>
      </div>
      <div mat-dialog-actions align="end">
        <button mat-button (click)="dialogRef.close()">Cerrar</button>
      </div>
    </div>
  `,
  styleUrl: './ver-receta.component.scss',
})
export class VerRecetaComponent {
  constructor(
    public dialogRef: MatDialogRef<VerRecetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
