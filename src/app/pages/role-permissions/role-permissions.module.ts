import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePermissionsRoutingModule } from './role-permissions-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    RolePermissionsRoutingModule
  ]
})
export class RolePermissionsModule { }
