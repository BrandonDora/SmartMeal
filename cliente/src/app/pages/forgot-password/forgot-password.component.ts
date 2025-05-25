import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpTokenService } from '../../http-token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  form: FormGroup;
  mensaje: string | null = null;
  error: boolean = false;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private httpToken: HttpTokenService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.mensaje = null;
    this.error = false;
    if (this.form.invalid) return;
    this.loading = true;
    const email = this.form.value.email;
    this.httpToken.verificarCorreo(email).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.existe) {
          this.mensaje = 'El correo fue enviado exitosamente.';
          this.error = false;
        } else {
          this.mensaje = '¡El correo escrito no existe!';
          this.error = true;
        }
      },
      error: () => {
        this.loading = false;
        this.mensaje = 'Ocurrió un error. Intenta de nuevo más tarde.';
        this.error = true;
      },
    });
  }
}
