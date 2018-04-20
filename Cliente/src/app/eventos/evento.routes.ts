import { Routes } from '@angular/router';

import { EventoComponent } from './evento.component';

import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { AdicionarEventoComponent } from './adicionar-evento/adicionar-evento.component';
import { MeusEventosComponent } from './meus-eventos/meus-eventos.component';
import { DetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';
import { EditarEventosComponent } from './editar-eventos/editar-eventos.component';
import { ExcluirEventoComponent } from './excluir-evento/excluir-evento.component';

import { AuthService } from '../services/auth.service';

export const eventosRouterConfig: Routes = [
  {
      path: '', component: EventoComponent,
      children: [
          { path: '', component: ListaEventosComponent },
          {
            path: 'novo',
            canActivate: [AuthService],
            component: AdicionarEventoComponent,
            data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }]
          },
          { path: 'meus-eventos', canActivate: [AuthService], component: MeusEventosComponent },
          { path: 'editar/:id', canActivate: [AuthService], component: EditarEventosComponent },
          { path: 'excluir/:id', canActivate: [AuthService], component: ExcluirEventoComponent },
          { path: 'detalhes/:id', component: DetalhesEventoComponent },
      ]
  }
];
