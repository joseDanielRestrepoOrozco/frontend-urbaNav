import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PqrsRoutingModule } from './pqrs-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    PqrsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PqrsModule { }
