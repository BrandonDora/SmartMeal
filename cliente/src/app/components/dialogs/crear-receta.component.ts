import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { environment } from '../../../environments/environment';

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
            class="d-flex flex-column align-items-center"
            style="width: 477px; margin-bottom: 8px; gap: 2px;"
          >
            <div
              class="d-flex align-items-center"
              style="gap: 2px; width: 100%;"
            >
              <!-- Select de ingrediente -->
              <select
                [(ngModel)]="ingrediente"
                name="ingredienteSelect"
                class="form-select select-ingrediente"
                required
                style="width: 200px; min-width: 200px; max-width: 200px; height: 44px; margin: 0; text-align: center; font-size: 1rem; padding: 2px 6px;"
              >
                <option [ngValue]="null" disabled selected>
                  --Ingrediente--
                </option>
                <option *ngFor="let ing of ingredientes" [ngValue]="ing.id">
                  {{ ing.nombre }}
                </option>
              </select>
              <!-- Cantidad -->
              <input
                [(ngModel)]="cantidadIngrediente"
                name="cantidadIngredienteInput"
                type="number"
                min="0"
                step="any"
                placeholder="Cantidad"
                class="form-control input-cantidad"
                required
                style="width: 200px; min-width: 200px; max-width: 200px; height: 44px; margin: 0; text-align: center; display: inline-block; font-size: 1rem; padding: 2px 6px;"
              />
              <button
                type="button"
                (click)="agregarIngredienteLabel()"
                class="btn btn-primary btn-add-ingrediente rounded-circle d-flex justify-content-center align-items-center"
                style="width: 32px; height: 32px; padding: 0; font-size: 1.1rem; z-index: 2;"
                title="Añadir ingrediente"
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>
            <!-- Etiquetas de ingredientes añadidos -->
            <div class="mt-2 d-flex flex-wrap" style="gap: 8px;">
              <span
                *ngFor="let item of getIngredientesValidos(); let i = index"
                class="ingrediente-label d-flex align-items-center"
                style="gap: 4px;"
              >
                {{ obtenerNombreIngrediente(item.ingredienteId) }} ({{
                  item.cantidad
                }})

                <button
                  type="button"
                  class="btn btn-danger btn-sm ms-1 p-0 d-flex align-items-center justify-content-center"
                  style="width: 22px; height: 22px; font-size: 1rem; border-radius: 50%;"
                  title="Eliminar ingrediente"
                  (click)="eliminarIngrediente(i)"
                >
                  <i class="bi bi-x"></i>
                </button>
              </span>
            </div>
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
          <option [ngValue]="null" disabled selected>
            Selecciona el momento de la comida
          </option>
          <option *ngFor="let t of tiemposComida" [ngValue]="t.id">
            {{ t.nombre }}
          </option>
        </select>

        <!-- Select de categoría (dinámico) -->
        <select
          class="form-select"
          name="categoria"
          [(ngModel)]="categoria"
          required
          style="margin-bottom: 18px;"
        >
          <option [ngValue]="null" disabled selected>
            Selecciona una categoría
          </option>
          <option *ngFor="let cat of categorias" [ngValue]="cat.id_categoria">
            {{ cat.nombre }}
          </option>
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
  categoria: number | null = null;
  imagen: File | null = null;
  errorMsg = '';
  loading = false;
  ingrediente: number | null = null;
  cantidadIngrediente: number | null = null;
  ingredientes: Array<{ id: number; nombre: string }> = [];
  tiempo_comida: number | null = null;
  tiemposComida: Array<{ id: number; nombre: string }> = [];
  mostrarErrorCampos = false;

  // Ingredientes para la receta (repeater)
  ingredientesReceta: Array<{
    ingredienteId: number | null;
    cantidad: number | null;
  }> = [];

  // Nueva propiedad para las categorías
  categorias: Array<{ id_categoria: number; nombre: string }> = [];

  constructor(
    public dialogRef: MatDialogRef<CrearRecetaComponent>,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Cargar ingredientes desde la API
    this.http
      .get<any[]>(
        environment.apiUrl.replace(/\/api$/, '') + '/api/ingredientes'
      )
      .subscribe({
        next: (data) => {
          // Ordenar ingredientes alfabéticamente por nombre
          this.ingredientes = data.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
          );
        },
        error: () => {
          this.ingredientes = [];
        },
      });
    // Cargar tiempos de comida desde la API
    this.http
      .get<any[]>(
        environment.apiUrl.replace(/\/api$/, '') + '/api/tiempo_comida'
      )
      .subscribe({
        next: (data) => {
          // Mapear id_tipo a id para que el select use el id correcto
          this.tiemposComida = data.map((tc) => ({
            id: tc.id_tipo, // id_tipo de la base de datos
            nombre: tc.nombre,
          }));
        },
        error: () => {
          this.tiemposComida = [];
        },
      });
    // Cargar categorías desde la API
    this.http
      .get<any[]>(environment.apiUrl.replace(/\/api$/, '') + '/api/categorias')
      .subscribe({
        next: (data) => {
          this.categorias = data.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
          );
        },
        error: () => {
          this.categorias = [];
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

  agregarIngredienteLabel() {
    if (this.ingrediente && this.cantidadIngrediente) {
      // Evitar duplicados del mismo ingrediente
      const existe = this.ingredientesReceta.some(
        (item) => item.ingredienteId === this.ingrediente
      );
      if (!existe) {
        this.ingredientesReceta.push({
          ingredienteId: this.ingrediente,
          cantidad: this.cantidadIngrediente,
        });
      }
      this.ingrediente = null;
      this.cantidadIngrediente = null;
    }
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
      this.tiempo_comida === null ||
      this.categoria === null
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
    formData.append('categoria', String(Number(this.categoria)));
    formData.append('tiempo_comida', String(Number(this.tiempo_comida)));
    // El campo categoría es decorativo por ahora
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;
    this.http
      .post<any>(environment.apiUrl + '/api/recetas', formData, { headers })
      .subscribe({
        next: (resp) => {
          this.loading = false;
          this.mostrarModalExito();
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err?.error?.message || 'Error al crear la receta.';
        },
      });
  }

  mostrarModalExito() {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal fade show" style="display:block; background:rgba(0,0,0,0.5)">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-center p-4">
            <i class="bi bi-check-circle-fill text-success" style="font-size:3rem"></i>
            <h4 class="mt-3">Receta Creada</h4>
            <button class="btn btn-success mt-3" id="cerrar-modal-exito">Cerrar</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    // Recargar la página al cerrar el modal
    setTimeout(() => {
      const btn = document.getElementById('cerrar-modal-exito');
      if (btn) {
        btn.addEventListener('click', () => {
          window.location.reload();
        });
      }
    }, 100);
  }

  obtenerNombreIngrediente(id: number | null): string {
    if (id === null) return '';
    const ing = this.ingredientes.find((i) => i.id === id);
    return ing ? ing.nombre : '';
  }

  getIngredientesValidos() {
    return this.ingredientesReceta.filter(
      (i) => i.ingredienteId !== null && i.cantidad !== null
    );
  }
}
