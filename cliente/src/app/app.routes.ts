import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RecetasComponent } from './pages/recetas/recetas.component';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { ListaCompraComponent } from './pages/lista-compra/lista-compra.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotPass', component: ForgotPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'recetas', component: RecetasComponent, canActivate: [AuthGuard] },
  {
    path: 'calculadora',
    component: CalculadoraComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listaCompra',
    component: ListaCompraComponent,
    canActivate: [AuthGuard],
  },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
];
