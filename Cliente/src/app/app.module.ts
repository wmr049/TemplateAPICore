import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';

// external componentes
import { CustomFormsModule } from 'ng2-validation';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

// Components
import { HomeComponent } from './home/home.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login.component';

// Services
import { SeoService } from './services/seo.services';
import { OrganizadorService } from './services/organizador.service';
import { AuthService } from './services/auth.service';

// NG Modules
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InscricaoComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CustomFormsModule,

    ToastModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, {useHash: false})
  ],
  providers: [
    Title,
    SeoService,
    OrganizadorService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
