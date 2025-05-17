import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogedHeaderComponent } from '../../components/loged-header/loged-header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [RouterModule, LogedHeaderComponent, FooterComponent],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.scss',
})
export class RecetasComponent implements OnInit {
  recetas: any[] = [];
  receta: any = null;
  x: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/api/recetas').subscribe({
      next: (data) => {
        this.recetas = data;
        console.log('Todas las recetas:', data);
      },
      error: (err) => console.error('Error al obtener recetas', err),
    });
    this.getRecetaPorId();
  }

  getRecetaPorId(): void {
    this.http.get<any>(`/api/recetas/${this.x}`).subscribe({
      next: (data) => {
        this.receta = data;
        console.log('Receta por id:', data);
      },
      error: (err) => console.error('Error al obtener receta por id', err),
    });
  }
}
