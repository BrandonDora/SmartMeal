import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-lista-compra',
  standalone: true,
  imports: [RouterModule, LogedHeaderComponent, FooterComponent],
  templateUrl: './lista-compra.component.html',
  styleUrl: './lista-compra.component.scss',
})
export class ListaCompraComponent {}
