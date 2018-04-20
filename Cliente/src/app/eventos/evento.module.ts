import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// modules
import { MyDatePickerModule } from 'mydatepicker';

// components
import { EventoComponent } from './evento.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { AdicionarEventoComponent } from './adicionar-evento/adicionar-evento.component';
import { MeusEventosComponent } from './meus-eventos/meus-eventos.component';
import { DetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';
import { EditarEventosComponent } from './editar-eventos/editar-eventos.component';
import { ExcluirEventoComponent } from './excluir-evento/excluir-evento.component';


// eventos services
import { EventoService } from './services/evento.service';
import { AuthService } from '../services/auth.service';

// services
import { SeoService } from '../services/seo.services';
import { OrganizadorService } from '../services/organizador.service';

// config
import { eventosRouterConfig } from './evento.routes';

// NG Modules
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(eventosRouterConfig),
    HttpModule,
    ReactiveFormsModule,
    MyDatePickerModule
  ],
  declarations: [
    EventoComponent,
    ListaEventosComponent,
    AdicionarEventoComponent,
    MeusEventosComponent,
    DetalhesEventoComponent,
    EditarEventosComponent,
    ExcluirEventoComponent,
  ],
  providers: [
    Title,
    SeoService,
    EventoService,
    OrganizadorService,
    AuthService
  ],
  exports: [RouterModule]
})

export class EventosModule { }
