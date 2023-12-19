import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicialComponent } from './inicial/inicial.component';
import { CodigoComponent } from './codigo/codigo.component';
import { CambioComponent } from './cambio/cambio.component';

const routes: Routes = [
  {path: "inicial", component:InicialComponent},
  {path: "codigo", component:CodigoComponent},
  {path: "cambio", component:CambioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CambioContraseñaRoutingModule { }
