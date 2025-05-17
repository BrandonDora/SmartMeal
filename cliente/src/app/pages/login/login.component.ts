import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
import { HttpTokenService } from '../../http-token.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  errMessage: string | null = null;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tokenService: HttpTokenService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.invalid) {
      if (this.loginForm.get('password')?.errors?.['minlength']) {
        this.errMessage = 'La contraseña debe tener más de 5 caracteres';
      } else {
        this.errMessage = 'Formulario inválido';
      }
      return;
    }

    const { email, password } = this.loginForm.value;
    this.loginRequest(email, password);
  }

  private loginRequest(email: string, password: string) {
    this.tokenService.login(email, password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errMessage = error?.error?.message || 'Error al iniciar sesión';
      },
    });
  }
}
