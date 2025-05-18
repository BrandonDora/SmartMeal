import { Component, OnInit } from '@angular/core';
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
  FormsModule,
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
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errMessage: string | null = null;
  showPassword: boolean = false;
  rememberMe: boolean = false;

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

  ngOnInit(): void {
    this.autocompletarCredenciales();
  }

  autocompletarCredenciales() {
    const savedEmail = localStorage.getItem('rememberEmail');
    const savedPassword = localStorage.getItem('rememberPassword');
    if (savedEmail) {
      this.loginForm.patchValue({ email: savedEmail });
      this.rememberMe = true;
    }
    if (savedPassword) {
      this.loginForm.patchValue({ password: savedPassword });
    }
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

    // Guardar o borrar datos según el checkbox
    if (this.rememberMe) {
      localStorage.setItem('rememberEmail', email);
      localStorage.setItem('rememberPassword', password);
    } else {
      localStorage.removeItem('rememberEmail');
      localStorage.removeItem('rememberPassword');
    }

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
