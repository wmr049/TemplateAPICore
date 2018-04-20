import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login.component';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: 'inscricao', component: InscricaoComponent },
  { path: 'entrar', component: LoginComponent },
  { path: 'eventos', loadChildren: 'app/eventos/evento.module#EventosModule' }
];
