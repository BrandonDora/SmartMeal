import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loged-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './loged-header.component.html',
  styleUrl: './loged-header.component.scss',
})
export class LogedHeaderComponent {
  @Input() fotoPerfilUrl: string = 'assets/img/default.jpg';
  hover: string | null = null;
  constructor(public router: Router) {}
  setHover(route: string | null) {
    this.hover = route;
  }

  get fotoPerfilUrlCompleta(): string {
    if (this.fotoPerfilUrl && this.fotoPerfilUrl.trim() !== '') {
      if (this.fotoPerfilUrl.startsWith('/storage/')) {
        return 'http://localhost:8000' + this.fotoPerfilUrl;
      }
      return this.fotoPerfilUrl;
    }
    return 'assets/img/default.jpg';
  }
}
