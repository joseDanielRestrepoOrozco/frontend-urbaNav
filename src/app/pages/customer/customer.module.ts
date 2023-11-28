import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CreateComponent } from './create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    HttpClientModule,
    SocketIoModule.forRoot(config),
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
