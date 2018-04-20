import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: []
})

export class MenuSuperiorComponent implements OnInit {
  private token: string;

  usuarioLogado(): boolean {
    this.token = localStorage.getItem('eio.token');
    if (!this.token) {
      return false;
    }
    return true;
  }

  ngOnInit() {
  }

}
