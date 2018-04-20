import { Component, OnInit } from '@angular/core';
import { SeoService, SeoModel } from '../services/seo.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(seoService: SeoService) {
    const seoModel: SeoModel = <SeoModel>{
      title: 'Seja bem vindo',
      robots: 'Index, Follow'
    };

    seoService.setSeoData(seoModel);
  }

  ngOnInit() {
  }

}
