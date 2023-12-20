import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CambioContraseñaRoutingModule } from './cambio-contraseña-routing.module';
import { InicialComponent } from './inicial/inicial.component';
import { CodigoComponent } from './codigo/codigo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CambioComponent } from './cambio/cambio.component';


@NgModule({
  declarations: [
    InicialComponent,
    CodigoComponent,
    CambioComponent
  ],
  imports: [
    CommonModule,
    CambioContraseñaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CambioContraseñaModule { }
