import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generar-menu-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop">
      <div class="modal-content menu-form-box">
        <form (ngSubmit)="onSubmit()">
          <h5>Generar menú personalizado</h5>
          <div class="mb-3">
            <label for="nombreMenu" class="form-label">Nombre:</label>
            <input
              type="text"
              class="form-control no-focus-shadow"
              id="nombreMenu"
              [(ngModel)]="nombreMenu"
              name="nombreMenu"
              required
              autocomplete="off"
              placeholder="Nombre del menú"
            />
          </div>
          <div class="mb-3">
            <label for="categoriaMenu" class="form-label">Categorías:</label>
            <select
              class="form-select select-categoria-menu"
              id="categoriaMenu"
              [(ngModel)]="categoriaSeleccionada"
              name="categoriaMenu"
              (change)="onCategoriaSeleccionada()"
            >
              <option [ngValue]="null" disabled selected>
                -- Seleccionar categoría --
              </option>
              <option
                *ngFor="let categoria of categorias"
                [ngValue]="categoria.id_categoria"
                [disabled]="
                  categoriasSeleccionadas.includes(categoria.id_categoria)
                "
              >
                {{ categoria.nombre }}
              </option>
            </select>
            <div class="mt-2 d-flex flex-wrap gap-2">
              <span
                *ngFor="let catId of categoriasSeleccionadas"
                class="badge bg-success align-items-center d-flex"
                style="border-radius: 18px; padding: 6px 14px; font-size: 1rem; gap: 6px;"
              >
                {{ obtenerNombreCategoria(catId) }}
                <button
                  type="button"
                  class="btn btn-sm btn-danger ms-1 p-0 d-flex align-items-center justify-content-center"
                  style="width: 22px; height: 22px; font-size: 1rem; border-radius: 50%;"
                  (click)="eliminarCategoria(catId)"
                >
                  <i class="bi bi-x"></i>
                </button>
              </span>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-3">
            <button
              type="button"
              class="btn btn-secondary"
              (click)="cancelar.emit()"
            >
              Cancelar
            </button>
            <button type="submit" class="btn btn-success">Generar Menú</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['../../components/dialogs/crear-menu-modal.component.scss'],
})
export class GenerarMenuModalComponent {
  @Input() categorias: any[] = [];
  @Output() generar = new EventEmitter<{
    nombre: string;
    categoria: number[];
  }>();
  @Output() cancelar = new EventEmitter<void>();

  nombreMenu: string = '';
  categoriaSeleccionada: number | null = null;
  categoriasSeleccionadas: number[] = [];

  set categoriaSeleccionadaSetter(val: any) {
    this.categoriaSeleccionada = val !== '' ? Number(val) : null;
  }
  get categoriaSeleccionadaGetter() {
    return this.categoriaSeleccionada;
  }

  onCategoriaSeleccionada() {
    if (
      this.categoriaSeleccionada !== null &&
      !this.categoriasSeleccionadas.includes(this.categoriaSeleccionada)
    ) {
      this.categoriasSeleccionadas.push(this.categoriaSeleccionada);
    }
    this.categoriaSeleccionada = null;
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

  onSubmit() {
    if (this.nombreMenu.trim() && this.categoriasSeleccionadas.length > 0) {
      this.generar.emit({
        nombre: this.nombreMenu,
        categoria: this.categoriasSeleccionadas,
      });
    }
  }
}
