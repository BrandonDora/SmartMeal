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
            [src]="previewUrl || 'assets/img/default.jpg'"
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
    const s3Url =
      'http://s3.us-east-1.amazonaws.com/smartmeal.imagenes/perfiles/' +
      file.name;
    this.http
      .put(s3Url, file, {
        headers: new HttpHeaders({ 'Content-Type': file.type }),
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close(s3Url); // Devuelve la URL de S3 al cerrar
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = 'Error al subir la foto. Intenta nuevamente.';
        },
      });
  }
}
