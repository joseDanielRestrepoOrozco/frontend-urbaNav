import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ShowHidePasswordDirective } from './show-hide-password.directive';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { BrowserModule } from '@angular/platform-browser';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
import { SessionComponent } from './pages/session/session.component';
import { CodeVerificationComponent } from './pages/code-verification/code-verification.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    BrowserModule,
    SocketIoModule.forRoot(config),
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ShowHidePasswordDirective,
    SessionComponent,
    CodeVerificationComponent,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }