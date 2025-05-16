import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // login() {
  //   if (this.loginForm.invalid) {
  //     console.error('Formulario inválido');
  //     return;
  //   }

  //   const { email, password } = this.loginForm.value;

  //   AuthHelper.getCsrfToken().subscribe(() => {
  //     AuthHelper.login({
  //       email,
  //       password,
  //     }).subscribe({
  //       next: () => {
  //         console.log('Login exitoso');
  //         this.router.navigate(['/dashboard']);
  //       },
  //       error: (error: any) => {
  //         console.error('Error al iniciar sesión', error);
  //       },
  //     });
  //   });
  // }
}
