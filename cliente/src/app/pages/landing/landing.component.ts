import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpTokenService } from '../../http-token.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, FooterComponent, HeaderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  errMessage!: string | null;
  user!: any | null;

  constructor(private svc: HttpTokenService, private router: Router) {}

  ngOnInit(): void {
    this.svc.getUser().subscribe({
      next: (res) => (this.user = res),
      error: (err) => (this.errMessage = err.error.message),
    });

    //@if(user !=null){ {{user.name}} }
    //@if(errMessage !=null){ {{errMessage}} }
  }
}
