import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-menu-modal',
  template: `
    <div class="modal-backdrop">
      <div class="modal-content menu-form-box">
        <form (ngSubmit)="onSubmit()">
          <h5>Crear nuevo menú</h5>
          <div class="mb-3">
            <label for="nombreMenu" class="form-label">Nombre del menú</label>
            <input
              type="text"
              class="form-control no-focus-shadow"
              id="nombreMenu"
              [(ngModel)]="nuevoMenu.nombre"
              name="nombreMenu"
              required
              autocomplete="off"
            />
          </div>
          <div class="d-flex justify-content-between mt-3">
            <button type="button" class="btn btn-secondary" (click)="cerrar()">
              Cancelar
            </button>
            <button type="submit" class="btn btn-success">Crear</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['../../components/dialogs/crear-menu-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CrearMenuModalComponent {
  @Output() crear = new EventEmitter<{ nombre: string }>();
  @Output() cancelar = new EventEmitter<void>();

  nuevoMenu = { nombre: '' };

  onSubmit() {
    if (this.nuevoMenu.nombre.trim()) {
      this.crear.emit({ ...this.nuevoMenu });
      this.nuevoMenu = { nombre: '' };
    }
  }

  cerrar() {
    this.cancelar.emit();
  }
}
