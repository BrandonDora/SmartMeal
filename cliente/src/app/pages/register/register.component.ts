import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpTokenService } from '../../http-token.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    FooterComponent,
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errMessage: string | null = null;
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private tokenService: HttpTokenService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  togglePasswordConfirm(): void {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  onSubmit() {
    // Validación de campos vacíos
    if (
      !this.registerForm.get('usuario')?.value ||
      !this.registerForm.get('email')?.value ||
      !this.registerForm.get('password')?.value ||
      !this.registerForm.get('password_confirmation')?.value
    ) {
      this.errMessage = 'Por favor, completa todos los campos.';
      return;
    }
    // Validación frontend de contraseñas
    if (
      this.registerForm.get('password')?.value !==
      this.registerForm.get('password_confirmation')?.value
    ) {
      this.errMessage = 'Las contraseñas no coinciden.';
      return;
    }
    if (this.registerForm.get('password')?.value.length < 6) {
      this.errMessage = 'La contraseña debe tener al menos 5 caracteres.';
      return;
    }
    if (this.registerForm.invalid) {
      this.errMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    this.errMessage = null;
    this.tokenService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err?.error?.errors?.email?.[0]?.includes('ya ha sido registrado')) {
          this.errMessage = 'El correo electrónico ya está en uso';
        } else if (
          err?.error?.errors?.usuario?.[0]?.includes('ya ha sido registrado')
        ) {
          this.errMessage = 'El usuario introducido ya existe';
        } else if (err?.error?.errors?.password?.[0]?.includes('min')) {
          this.errMessage = 'La contraseña debe tener al menos 5 caracteres.';
        } else {
          this.errMessage = err?.error?.message || 'Error al registrar usuario';
        }
      },
    });
  }
}
