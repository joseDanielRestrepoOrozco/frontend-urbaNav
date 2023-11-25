import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PointsRoutingModule } from './points-routing.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    PointsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PointsModule { }
