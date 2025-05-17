import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpTokenService } from './http-token.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'cliente';

  constructor(private tokenSvc: HttpTokenService) {}

  ngOnInit() {
    this.tokenSvc.getCrsfToken().subscribe((x) => console.log(x));
  }
}
