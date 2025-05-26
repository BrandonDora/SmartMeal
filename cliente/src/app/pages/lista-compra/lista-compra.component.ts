import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpTokenService } from '../../http-token.service';

@Component({
  selector: 'app-lista-compra',
  standalone: true,
  imports: [RouterModule, LogedHeaderComponent, FooterComponent],
  templateUrl: './lista-compra.component.html',
  styleUrl: './lista-compra.component.scss',
})
export class ListaCompraComponent implements OnInit {
  fotoPerfilUrl: string = 'assets/img/default.jpg';

  constructor(private tokenService: HttpTokenService) {}

  ngOnInit(): void {
    this.tokenService.getUser().subscribe({
      next: (data) => {
        if (data.foto_perfil && data.foto_perfil.trim() !== '') {
          this.fotoPerfilUrl = data.foto_perfil.startsWith('/storage/')
            ? 'http://localhost:8000' + data.foto_perfil
            : data.foto_perfil;
        } else {
          this.fotoPerfilUrl = 'assets/img/default.jpg';
        }
      },
      error: () => {
        this.fotoPerfilUrl = 'assets/img/default.jpg';
      },
    });
  }
}
