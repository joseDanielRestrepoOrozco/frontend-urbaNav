import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { InicialComponent } from './inicial/inicial.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDriverComponent } from './create-driver/create-driver.component';


@NgModule({
  declarations: [
    InicialComponent,
    CreateCustomerComponent,
    CreateDriverComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistrationModule { }
