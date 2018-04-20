import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';

// components
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { FooterComponent } from './footer/footer.component';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CollapseModule
    ],
    declarations: [
        MenuSuperiorComponent,
        FooterComponent,
        MenuLoginComponent,
        AcessoNegadoComponent
    ],
    exports: [
        MenuSuperiorComponent,
        FooterComponent,
        MenuLoginComponent,
        AcessoNegadoComponent
    ]
})

export class SharedModule {}
