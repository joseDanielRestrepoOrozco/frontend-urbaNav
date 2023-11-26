import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePermissionsRoutingModule } from './role-permissions-routing.module';
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
    RolePermissionsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RolePermissionsModule { }
