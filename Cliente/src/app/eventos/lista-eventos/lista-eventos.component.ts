import { Component, OnInit } from '@angular/core';
import { SeoService, SeoModel } from '../../services/seo.services';
import { Evento } from '../models/evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {

  public eventos: Evento[];
  errorMessage: string;

  constructor(seoService: SeoService,
    private service: EventoService) {

    let seoModel: SeoModel = <SeoModel>{
      title: 'Próximos Eventos',
      description: 'Lista dos próximos eventos técnicos no Brasil',
      robots: 'Index, Follow',
      keywords: 'eventos,workshops,encontros,congressos'
    };

    seoService.setSeoData(seoModel);


  }

  ngOnInit(): void {
    this.service.obterTodos()
      .subscribe(
      eventos => this.eventos = eventos,
      error => this.errorMessage);

  }
}
