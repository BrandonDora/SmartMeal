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
        />
        <textarea
          class="form-control"
          placeholder="Descripción"
          name="descripcion"
          [(ngModel)]="descripcion"
          required
          maxlength="300"
        ></textarea>
        <input type="file" accept="image/*" (change)="onFileSelected($event)" />
        <textarea
          class="form-control"
          placeholder="Instrucciones"
          name="instrucciones"
          [(ngModel)]="instrucciones"
          required
          maxlength="1000"
        ></textarea>

        <!-- Selección de ingredientes -->
        <div
          class="d-flex align-items-center"
          style="gap: 8px; margin-bottom: 12px;"
        >
          <!-- Select de ingrediente -->
          <select
            [(ngModel)]="ingredienteSeleccionado"
            name="ingredienteSelect"
            class="form-select select-ingrediente"
            required
            style="width: 200px; min-width: 200px; max-width: 200px; height: 44px; margin: 0; text-align: center; font-size: 1rem; padding: 2px 6px;"
            (change)="actualizarUnidadIngrediente()"
          >
            <option [ngValue]="null" disabled selected>--Ingrediente--</option>
            <option *ngFor="let ing of ingredientes" [ngValue]="ing.id">
              {{ ing.nombre }}
            </option>
          </select>
          <!-- Cantidad -->
          <input
            [(ngModel)]="cantidadSeleccionada"
            name="cantidadIngredienteInput"
            type="number"
            min="0"
            step="any"
            [placeholder]="
              'Cantidad' +
              (ingredienteUnidad ? ' (' + ingredienteUnidad + ')' : '')
            "
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
            {{ obtenerNombreIngrediente(item.id) }} ({{ item.cantidad }})

            <button
              type="button"
              class="btn btn-danger btn-sm ms-1 p-0 d-flex align-items-center justify-content-center"
              style="width: 22px; height: 22px; font-size: 1rem; border-radius: 50%;"
              title="Eliminar ingrediente"
              (click)="eliminarIngredienteLabel(item.id)"
            >
              <i class="bi bi-x"></i>
            </button>
          </span>
        </div>

        <!-- Select de tiempo_comida -->
        <select
          class="form-select"
          name="tiempo_comida"
          [(ngModel)]="tiempo_comida"
          required
          style="margin-bottom: 12px;"
          (change)="onTiempoComidaSeleccionado()"
        >
          <option [ngValue]="null" disabled selected>
            Selecciona el momento de la comida
          </option>
          <option *ngFor="let t of tiemposComida" [ngValue]="t.id">
            {{ t.nombre }}
          </option>
        </select>

        <!-- Etiquetas de tiempos de comida añadidos -->
        <div class="mt-2 d-flex flex-wrap" style="gap: 8px;">
          <span
            *ngFor="let item of tiempoComidaSeleccionados"
            class="tiempo-comida-label d-flex align-items-center"
            style="gap: 4px;"
          >
            {{ obtenerNombreTiempoComida(item) }}

            <button
              type="button"
              class="btn btn-danger btn-sm ms-1 p-0 d-flex align-items-center justify-content-center"
              style="width: 22px; height: 22px; font-size: 1rem; border-radius: 50%;"
              title="Eliminar tiempo de comida"
              (click)="eliminarTiempoComida(item)"
            >
              <i class="bi bi-x"></i>
            </button>
          </span>
        </div>

        <!-- Select de categoría (dinámico) -->
        <select
          class="form-select"
          name="categoria"
          [(ngModel)]="categoria"
          required
          style="margin-bottom: 18px;"
          (change)="onCategoriaSeleccionada()"
        >
          <option [ngValue]="null" disabled selected>
            Selecciona una categoría
          </option>
          <option *ngFor="let cat of categorias" [ngValue]="cat.id_categoria">
            {{ cat.nombre }}
          </option>
        </select>

        <!-- Etiquetas de categorías añadidas -->
        <div class="mt-2 d-flex flex-wrap" style="gap: 8px;">
          <span
            *ngFor="let item of categoriasSeleccionadas"
            class="categoria-label d-flex align-items-center"
            style="gap: 4px;"
          >
            {{ obtenerNombreCategoria(item) }}

            <button
              type="button"
              class="btn btn-danger btn-sm ms-1 p-0 d-flex align-items-center justify-content-center"
              style="width: 22px; height: 22px; font-size: 1rem; border-radius: 50%;"
              title="Eliminar categoría"
              (click)="eliminarCategoria(item)"
            >
              <i class="bi bi-x"></i>
            </button>
          </span>
        </div>

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
  ingredienteSeleccionado: number | null = null;
  cantidadSeleccionada: number | null = null;
  ingredientes: Array<{ id: number; nombre: string; unidad?: string }> = [];
  tiempo_comida: number | null = null;
  tiemposComida: Array<{ id: number; nombre: string }> = [];
  mostrarErrorCampos = false;

  // Ingredientes seleccionados para la receta
  ingredientesSeleccionados: Array<{ id: number; cantidad: number }> = [];

  // Nueva propiedad para las categorías
  categorias: Array<{ id_categoria: number; nombre: string }> = [];

  // Nueva propiedad para la unidad del ingrediente seleccionado
  ingredienteUnidad: string = '';

  // Cambios para selección múltiple de categorías y momentos de comida
  categoriasSeleccionadas: number[] = [];
  tiempoComidaSeleccionados: number[] = [];

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
          // Ordenar ingredientes alfabéticamente por nombre y mapear unidad
          this.ingredientes = data
            .map((i) => ({
              id: i.id,
              nombre: i.nombre,
              unidad: i.unidad || '',
            }))
            .sort((a, b) => a.nombre.localeCompare(b.nombre));
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

  agregarIngredienteLabel() {
    if (
      this.ingredienteSeleccionado &&
      this.cantidadSeleccionada &&
      !this.ingredientesSeleccionados.some(
        (i) => i.id === this.ingredienteSeleccionado
      )
    ) {
      this.ingredientesSeleccionados.push({
        id: this.ingredienteSeleccionado,
        cantidad: this.cantidadSeleccionada,
      });
      this.ingredienteSeleccionado = null;
      this.cantidadSeleccionada = null;
    }
  }

  eliminarIngredienteLabel(id: number) {
    this.ingredientesSeleccionados = this.ingredientesSeleccionados.filter(
      (i) => i.id !== id
    );
  }

  // Métodos para añadir y eliminar categorías
  onCategoriaSeleccionada() {
    if (
      this.categoria &&
      !this.categoriasSeleccionadas.includes(this.categoria)
    ) {
      this.categoriasSeleccionadas.push(this.categoria);
    }
    this.categoria = null;
  }
  eliminarCategoria(catId: number) {
    this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(
      (id) => id !== catId
    );
  }
  obtenerNombreCategoria(id: number): string {
    const cat = this.categorias.find((c) => c.id_categoria === id);
    return cat ? cat.nombre : '';
  }

  // Métodos para añadir y eliminar momentos de comida
  onTiempoComidaSeleccionado() {
    if (
      this.tiempo_comida &&
      !this.tiempoComidaSeleccionados.includes(this.tiempo_comida)
    ) {
      this.tiempoComidaSeleccionados.push(this.tiempo_comida);
    }
    this.tiempo_comida = null;
  }
  eliminarTiempoComida(id: number) {
    this.tiempoComidaSeleccionados = this.tiempoComidaSeleccionados.filter(
      (tid) => tid !== id
    );
  }
  obtenerNombreTiempoComida(id: number): string {
    const t = this.tiemposComida.find((tc) => tc.id === id);
    return t ? t.nombre : '';
  }

  verificarCamposYCrear() {
    const ingredientesValidos =
      this.ingredientesSeleccionados.length > 0 &&
      this.ingredientesSeleccionados.every((item) => item.id && item.cantidad);
    if (
      !this.nombre ||
      !this.descripcion ||
      !this.instrucciones ||
      !this.tiempo_preparacion ||
      !ingredientesValidos ||
      this.tiempoComidaSeleccionados.length === 0 ||
      this.categoriasSeleccionadas.length === 0
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
    const subirYCrear = (imagenUrl: string | null) => {
      const formData = new FormData();
      formData.append('nombre', this.nombre);
      formData.append('descripcion', this.descripcion);
      formData.append('instrucciones', this.instrucciones);
      formData.append('tiempo_preparacion', String(this.tiempo_preparacion));
      if (imagenUrl) {
        formData.append('imagen_url', imagenUrl); // Usar campo imagen_url para la URL de S3
      }
      // Adjuntar ingredientes como JSON (id y cantidad)
      formData.append(
        'ingredientes',
        JSON.stringify(this.ingredientesSeleccionados)
      );
      formData.append(
        'categorias',
        JSON.stringify(this.categoriasSeleccionadas)
      );
      formData.append(
        'tiempos_comida',
        JSON.stringify(this.tiempoComidaSeleccionados)
      );
      // Adjuntar el user_id
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (user && user.id) {
        formData.append('user_id', String(user.id));
      }
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
    };

    if (this.imagen) {
      const file = this.imagen;
      // Asegura que la URL tenga la barra antes del nombre
      const s3Url =
        'http://s3.us-east-1.amazonaws.com/smartmeal.imagenes/recetas/' +
        encodeURIComponent(file.name);
      this.http
        .put(s3Url, file, {
          headers: new HttpHeaders({ 'Content-Type': file.type }),
        })
        .subscribe({
          next: () => {
            subirYCrear(s3Url);
          },
          error: (err) => {
            this.loading = false;
            this.errorMsg = 'Error al subir la imagen. Intenta nuevamente.';
          },
        });
    } else {
      subirYCrear(null);
    }
  }

  mostrarModalExito() {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal fade show" style="display:block; background:rgba(0,0,0,0.5)">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-center p-4">
            <i class="bi bi-check-circle-fill" style="color:#5a7212; font-size:3rem"></i>
            <h4 class="mt-3">Receta Creada</h4>
            <button class="btn btn-success mt-3" id="cerrar-modal-exito" style="background:#5a7212 !important; border-radius:22px !important; border:none !important; color:#fff !important; font-weight:bold; padding:8px 32px;">Cerrar</button>
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
    return this.ingredientesSeleccionados;
  }

  // Nuevo método para actualizar la unidad al seleccionar ingrediente
  actualizarUnidadIngrediente() {
    if (this.ingredienteSeleccionado) {
      const ing = this.ingredientes.find(
        (i) => i.id === this.ingredienteSeleccionado
      );
      this.ingredienteUnidad = ing ? ing.unidad || '' : '';
    } else {
      this.ingredienteUnidad = '';
    }
  }
}
