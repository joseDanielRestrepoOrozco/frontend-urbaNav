import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PointsRoutingModule } from './points-routing.module';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    PointsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PointsModule { }
