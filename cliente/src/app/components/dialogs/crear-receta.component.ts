import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-crear-receta',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule],
  template: `
    <div class="dialog-content">
      <h2 mat-dialog-title class="titulo-dialogo">Crear nueva receta</h2>
      <form (ngSubmit)="crearReceta()" #formReceta="ngForm">
        <input
          type="text"
          class="form-control"
          placeholder="Nombre de la receta"
          name="nombre"
          [(ngModel)]="nombre"
          required
          maxlength="100"
          style="margin-bottom: 12px;"
        />
        <textarea
          class="form-control"
          placeholder="Descripción"
          name="descripcion"
          [(ngModel)]="descripcion"
          required
          maxlength="300"
          style="margin-bottom: 12px;"
        ></textarea>
        <input
          type="file"
          accept="image/*"
          (change)="onFileSelected($event)"
          style="margin-bottom: 12px;"
        />
        <textarea
          class="form-control"
          placeholder="Instrucciones"
          name="instrucciones"
          [(ngModel)]="instrucciones"
          required
          maxlength="1000"
          style="margin-bottom: 12px;"
        ></textarea>
        <input
          type="number"
          class="form-control"
          placeholder="Tiempo de preparación (min)"
          name="tiempo_preparacion"
          [(ngModel)]="tiempo_preparacion"
          min="1"
          step="0.1"
          required
          style="margin-bottom: 12px;"
        />
        <select
          class="form-select"
          name="categoria"
          [(ngModel)]="categoria"
          required
          style="margin-bottom: 18px;"
        >
          <option value="" disabled selected>Selecciona una categoría</option>
          <option value="Desayuno">Desayuno</option>
          <option value="Almuerzo">Almuerzo</option>
          <option value="Cena">Cena</option>
          <option value="Snack">Snack</option>
          <option value="Vegetariano">Vegetariano</option>
          <option value="Vegano">Vegano</option>
          <option value="Postre">Postre</option>
        </select>
      </form>
      <div mat-dialog-actions align="end">
        <button mat-button (click)="dialogRef.close()">Cancelar</button>
        <button
          mat-raised-button
          color="primary"
          (click)="crearReceta()"
          [disabled]="!formReceta.form.valid"
        >
          Crear
        </button>
      </div>
      <div *ngIf="errorMsg" class="error-msg">{{ errorMsg }}</div>
      <div *ngIf="loading" class="loading-msg">Creando receta...</div>
    </div>
  `,
  styleUrl: './crear-receta.component.scss',
})
export class CrearRecetaComponent {
  nombre = '';
  descripcion = '';
  instrucciones = '';
  tiempo_preparacion: number | null = null;
  categoria = '';
  imagen: File | null = null;
  errorMsg = '';
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CrearRecetaComponent>,
    private http: HttpClient
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imagen = input.files[0];
    }
  }

  crearReceta() {
    if (
      !this.nombre ||
      !this.descripcion ||
      !this.instrucciones ||
      !this.tiempo_preparacion
    ) {
      this.errorMsg = 'Completa todos los campos.';
      return;
    }
    this.errorMsg = '';
    this.loading = true;
    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('instrucciones', this.instrucciones);
    formData.append('tiempo_preparacion', String(this.tiempo_preparacion));
    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }
    // El campo categoría es decorativo por ahora
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;
    this.http
      .post<any>('http://localhost:8000/api/recetas', formData, { headers })
      .subscribe({
        next: (resp) => {
          this.loading = false;
          this.dialogRef.close(resp && resp.receta ? resp.receta : resp);
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err?.error?.message || 'Error al crear la receta.';
        },
      });
  }
}
