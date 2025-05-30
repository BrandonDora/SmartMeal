import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpTokenService } from '../../http-token.service';

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
      <div class="mb-2" *ngIf="ingredientes && ingredientes.length">
        <b>Ingredientes:</b>
        <ul style="list-style: none; padding-left: 0;">
          <li *ngFor="let ing of ingredientes">
            {{ ing.nombre
            }}<span *ngIf="ing.cantidad"
              >: {{ ing.cantidad }} {{ ing.unidad }}</span
            >
          </li>
        </ul>
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
export class VerRecetaComponent implements OnInit {
  ingredientes: any[] = [];
  cargandoIngredientes = false;

  constructor(
    public dialogRef: MatDialogRef<VerRecetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenService: HttpTokenService
  ) {}

  ngOnInit(): void {
    if (!this.data.id_receta) return;
    this.cargandoIngredientes = true;
    // 1. Obtener relaciones receta_ingrediente para la receta actual
    this.tokenService
      .getRecetaIngredientesByRecetaIds([this.data.id_receta])
      .subscribe({
        next: (relaciones) => {
          if (!relaciones.length) {
            this.ingredientes = [];
            this.cargandoIngredientes = false;
            return;
          }
          // 2. Obtener los ids de ingredientes
          const idsIngredientes = relaciones.map((r: any) => r.id_ingrediente);
          this.tokenService.getIngredientesByIds(idsIngredientes).subscribe({
            next: (ingredientes) => {
              // 3. Unir info de cantidad/unidad
              this.ingredientes = relaciones.map((rel: any) => {
                const ing = ingredientes.find(
                  (i: any) =>
                    i.id_ingrediente === rel.id_ingrediente ||
                    i.id === rel.id_ingrediente
                );
                return {
                  nombre: ing?.nombre || 'Ingrediente',
                  cantidad: rel.cantidad,
                  unidad: ing?.unidad || '',
                };
              });
              this.cargandoIngredientes = false;
            },
            error: () => {
              this.ingredientes = [];
              this.cargandoIngredientes = false;
            },
          });
        },
        error: () => {
          this.ingredientes = [];
          this.cargandoIngredientes = false;
        },
      });
  }
}
