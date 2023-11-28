import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PqrsClienteRoutingModule } from './pqrs-cliente-routing.module';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    PqrsClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PqrsClienteModule { }
