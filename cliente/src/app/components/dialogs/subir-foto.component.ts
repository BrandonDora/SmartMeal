import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpTokenService } from '../../http-token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-subir-foto',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  template: `
    <div class="dialog-content">
      <h2 mat-dialog-title class="titulo-dialogo">
        Subir nueva foto de perfil
      </h2>
      <form>
        <div class="preview-container">
          <img
            [src]="
              previewUrl ||
              'https://s3.us-east-1.amazonaws.com/smartmeal.imagenes/perfiles/default.jpg'
            "
            alt="Previsualización"
            class="preview-img"
          />
        </div>
        <input type="file" accept="image/*" (change)="onFileSelected($event)" />
      </form>
      <div mat-dialog-actions align="end">
        <button mat-button mat-dialog-close [disabled]="loading">
          Cancelar
        </button>
        <button
          mat-raised-button
          color="primary"
          (click)="subirFoto()"
          [disabled]="!previewUrl || loading"
        >
          <span *ngIf="!loading">Subir</span>
          <span *ngIf="loading">Subiendo...</span>
        </button>
      </div>
      <div *ngIf="errorMsg" class="error-msg">{{ errorMsg }}</div>
    </div>
  `,
  styleUrl: './subir-foto.component.scss',
})
export class SubirFotoComponent {
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  loading = false;
  errorMsg = '';

  constructor(
    private httpToken: HttpTokenService,
    private dialogRef: MatDialogRef<SubirFotoComponent>,
    private http: HttpClient
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  subirFoto() {
    if (!this.selectedFile) return;
    this.loading = true;
    this.errorMsg = '';
    const file = this.selectedFile;
    // Guardar solo el nombre del archivo, pero la ruta final será S3
    const ruta =
      'https://s3.us-east-1.amazonaws.com/smartmeal.imagenes/perfiles/' +
      file.name;
    // Aquí normalmente subirías el archivo a S3, pero ahora solo devolvemos la ruta
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close(ruta); // Devuelve la ruta completa de S3
    }, 800);
  }
}
