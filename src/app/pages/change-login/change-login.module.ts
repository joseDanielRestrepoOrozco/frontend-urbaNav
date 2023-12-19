import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeLoginRoutingModule } from './change-login-routing.module';
import { ChangeComponent } from './change/change.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChangeComponent
  ],
  imports: [
    CommonModule,
    ChangeLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChangeLoginModule { }
