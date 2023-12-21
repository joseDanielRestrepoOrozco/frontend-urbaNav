import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicialComponent } from './inicial/inicial.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateDriverComponent } from './create-driver/create-driver.component';

const routes: Routes = [
  { path: "inicial", component: InicialComponent },
  { path: "create-customer", component: CreateCustomerComponent },
  { path: "create-driver", component: CreateDriverComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
