import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpTokenService } from '../../http-token.service';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [
    RouterModule,
    LogedHeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss',
})
export class CalculadoraComponent {
  calcForm: FormGroup;
  resultado: any = null;
  loading = false;
  error: string | null = null;
  success: string | null = null;
  bmr: number | null = null;
  caloriasMantenimiento: number | null = null;
  fotoPerfilUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private tokenService: HttpTokenService
  ) {
    this.calcForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
      age: ['', [Validators.required, Validators.min(1)]],
      sexo: ['hombre', Validators.required],
      activity: ['1.2', Validators.required],
      goal: ['bajar', Validators.required],
    });

    // Suscribirse a los cambios del formulario para recalcular automáticamente
    this.calcForm.valueChanges.subscribe(() => {
      this.calcularValores();
    });
    // Calcular valores iniciales
    this.calcularValores();

    // Obtener usuario y foto de perfil
    this.tokenService.getUser().subscribe({
      next: (user) => {
        this.fotoPerfilUrl = user.foto_perfil || 'assets/img/default.jpg';
      },
      error: () => {
        this.fotoPerfilUrl = 'assets/img/default.jpg';
      },
    });
  }

  calcularValores() {
    const { weight, height, age, sexo, activity } = this.calcForm.value;
    if (!weight || !height || !age || !sexo || !activity) {
      this.bmr = null;
      this.caloriasMantenimiento = null;
      return;
    }
    let bmr = 0;
    // Fórmula Mifflin-St Jeor (igual que backend)
    if (sexo === 'hombre') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    this.bmr = Math.round(bmr);
    this.caloriasMantenimiento = Math.round(bmr * parseFloat(activity));
  }

  calcular() {
    if (this.calcForm.invalid) {
      this.error = 'Por favor, completa todos los campos correctamente.';
      this.success = null;
      return;
    }
    this.loading = true;
    this.error = null;
    this.success = null;

    const body = { ...this.calcForm.value };
    // Ya se calculan los valores automáticamente

    const token = localStorage.getItem('token');
    const options = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    this.http.post<any>('/api/calculadora', body, options).subscribe({
      next: (res) => {
        this.resultado = res;
        this.loading = false;
        this.success = 'Información guardada correctamente';
        setTimeout(() => {
          this.success = null;
        }, 3500);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error al calcular.';
        this.loading = false;
        this.success = null;
      },
    });
  }
}
