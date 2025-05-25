import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpTokenService } from '../../http-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, LogedHeaderComponent, FooterComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  usuario = {
    nombre: 'Brandon Acapa',
    email: 'brandonemail.com',
    fechaRegistro: 'Enero 2025',
    foto_perfil: '', // Aquí simulas el campo, luego lo traes del backend
  };

  get fotoPerfilUrl(): string {
    return this.usuario.foto_perfil && this.usuario.foto_perfil.trim() !== ''
      ? this.usuario.foto_perfil
      : 'assets/img/default.jpg';
  }

  constructor(private tokenService: HttpTokenService, private router: Router) {}

  logout() {
    this.tokenService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
    });
  }
}
