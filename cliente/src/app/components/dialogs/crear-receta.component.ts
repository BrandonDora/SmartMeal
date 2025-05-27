import { Component, OnInit } from '@angular/core';
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

        <!-- Repeater de ingredientes -->
        <div id="ingredientes-repeater">
          <div
            *ngFor="let item of ingredientesReceta; let i = index"
            class="input-group-form ingrediente-row d-flex justify-content-center align-items-center"
            style="position: relative; width: 477px; margin-bottom: 8px; gap: 2px;"
          >
            <!-- Select de ingrediente -->
            <select
              [(ngModel)]="item.ingredienteId"
              name="ingredienteId{{ i }}"
              class="form-select select-ingrediente"
              required
              style="width: 200px; min-width: 200px; max-width: 200px; height: 44px; margin: 0; text-align: center; font-size: 1rem; padding: 2px 6px;"
            >
              <option [ngValue]="null" disabled selected>
                --Ingrediente--
              </option>
              <option *ngFor="let ing of ingredientes" [value]="ing.id">
                {{ ing.nombre }}
              </option>
            </select>
            <!-- Cantidad -->
            <input
              [(ngModel)]="item.cantidad"
              name="cantidadIngrediente{{ i }}"
              type="number"
              min="0"
              step="any"
              placeholder="Cantidad"
              class="form-control input-cantidad"
              required
              style="width: 200px; min-width: 200px; max-width: 200px; height: 44px; margin: 0; text-align: center; display: inline-block; font-size: 1rem; padding: 2px 6px;"
            />
            <button
              *ngIf="i === ingredientesReceta.length - 1"
              type="button"
              (click)="agregarIngrediente()"
              class="btn btn-primary btn-add-ingrediente btn-absolute rounded-circle d-flex justify-content-center align-items-center"
              style="position: absolute; top: 50%; right: 0; transform: translateY(-50%); width: 32px; height: 32px; padding: 0; font-size: 1.1rem; z-index: 2;"
              title="Añadir ingrediente"
            >
              <i class="bi bi-plus"></i>
            </button>
            <!-- Eliminar fila (opcional, descomentable) -->
            <!--
            <button
              type="button"
              (click)="eliminarIngrediente(i)"
              class="btn btn-danger btn-delete-ingrediente"
            >
              ✕
            </button>
            -->
          </div>
        </div>

        <!-- Select de tiempo_comida -->
        <select
          class="form-select"
          name="tiempo_comida"
          [(ngModel)]="tiempo_comida"
          required
          style="margin-bottom: 12px;"
        >
          <option value="" disabled selected>
            Selecciona el momento de la comida
          </option>
          <option *ngFor="let t of tiemposComida" [value]="t.id">
            {{ t.nombre }}
          </option>
        </select>

        <!-- Select de categoría (subido) -->
        <select
          class="form-select"
          name="categoria"
          [(ngModel)]="categoria"
          required
          style="margin-bottom: 18px;"
        >
          <option value="" disabled selected>Selecciona una categoría</option>
          <option value="Vegetariano">Vegetariano</option>
          <option value="Vegano">Vegano</option>
          <option value="Postre">Postre</option>
        </select>

        <!-- Tiempo de preparación (al final) -->
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
      </form>
      <p *ngIf="mostrarErrorCampos" class="error-msg" style="margin-bottom: 0;">
        Por favor, completa todos los campos
      </p>
      <div mat-dialog-actions align="end">
        <button mat-button (click)="dialogRef.close()">Cancelar</button>
        <button
          mat-raised-button
          color="primary"
          (click)="verificarCamposYCrear()"
          [disabled]="loading"
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
export class CrearRecetaComponent implements OnInit {
  nombre = '';
  descripcion = '';
  instrucciones = '';
  tiempo_preparacion: number | null = null;
  categoria = '';
  imagen: File | null = null;
  errorMsg = '';
  loading = false;
  ingrediente: string = '';
  ingredientes: Array<{ id: number; nombre: string }> = [];
  tiempo_comida: string = '';
  tiemposComida: Array<{ id: number; nombre: string }> = [];
  mostrarErrorCampos = false;

  // Ingredientes para la receta (repeater)
  ingredientesReceta: Array<{
    ingredienteId: number | null;
    cantidad: number | null;
  }> = [{ ingredienteId: null, cantidad: null }];

  constructor(
    public dialogRef: MatDialogRef<CrearRecetaComponent>,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Cargar ingredientes desde la API
    this.http.get<any[]>('http://localhost:8000/api/ingredientes').subscribe({
      next: (data) => {
        this.ingredientes = data;
      },
      error: () => {
        this.ingredientes = [];
      },
    });
    // Cargar tiempos de comida desde la API
    this.http.get<any[]>('http://localhost:8000/api/tiempo_comida').subscribe({
      next: (data) => {
        this.tiemposComida = data;
      },
      error: () => {
        this.tiemposComida = [];
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imagen = input.files[0];
    }
  }

  agregarIngrediente() {
    this.ingredientesReceta.push({ ingredienteId: null, cantidad: null });
  }

  eliminarIngrediente(i: number) {
    this.ingredientesReceta.splice(i, 1);
  }

  verificarCamposYCrear() {
    // Validar que todos los ingredientes tengan ingredienteId y cantidad
    const ingredientesValidos = this.ingredientesReceta.every(
      (item) => item.ingredienteId && item.cantidad
    );
    if (
      !this.nombre ||
      !this.descripcion ||
      !this.instrucciones ||
      !this.tiempo_preparacion ||
      !ingredientesValidos ||
      !this.tiempo_comida ||
      !this.categoria
    ) {
      this.mostrarErrorCampos = true;
      return;
    }
    this.mostrarErrorCampos = false;
    this.crearReceta();
  }

  crearReceta() {
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
    // Adjuntar ingredientes como JSON
    formData.append('ingredientes', JSON.stringify(this.ingredientesReceta));
    // El campo categoría es decorativo por ahora
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;
    this.http
      .post<any>('http://localhost:8000/api/recetas', formData, { headers })
      .subscribe({
        next: (resp) => {
          // Esperar a que la receta se cree y obtener su id
          const recetaId =
            resp && resp.receta ? resp.receta.id : resp.id || null;
          if (!recetaId) {
            this.loading = false;
            this.errorMsg = 'No se pudo obtener el id de la receta creada.';
            return;
          }
          // Ahora asociar receta y tiempo_comida en la tabla pivote
          const dataRelacion = {
            id_receta: recetaId,
            id_tiempo_comida: this.tiempo_comida,
          };
          this.http
            .post<any>(
              'http://localhost:8000/api/tiempo_comida',
              dataRelacion,
              { headers }
            )
            .subscribe({
              next: () => {
                this.loading = false;
                this.dialogRef.close(resp && resp.receta ? resp.receta : resp);
              },
              error: (err) => {
                this.loading = false;
                this.errorMsg =
                  err?.error?.message ||
                  'Error al asociar el tiempo de comida.';
              },
            });
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err?.error?.message || 'Error al crear la receta.';
        },
      });
  }
}
