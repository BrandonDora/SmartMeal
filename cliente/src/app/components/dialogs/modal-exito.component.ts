import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-exito',
  template: `
    <div class="modal-backdrop">
      <div class="modal-content modal-success-box text-center">
        <i class="fas fa-check-circle text-success" style="font-size:3rem"></i>
        <h4 class="mt-3">Información guardada correctamente</h4>
        <button class="btn btn-success mt-3" (click)="cerrar()">Cerrar</button>
      </div>
    </div>
  `,
  styleUrls: ['./modal-exito.component.scss'],
  standalone: true,
  imports: [],
})
export class ModalExitoComponent {
  @Output() cerrarModal = new EventEmitter<void>();
  cerrar() {
    this.cerrarModal.emit();
  }
}
