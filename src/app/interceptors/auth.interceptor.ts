import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private securityService:SecurityService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let theUser:User = this.securityService.userActiveSession
    const token:string = theUser["token"]

    if(request.url.includes('/login') || request.url.includes('/token-validation')) {
      console.log("no se pone token")
      return next.handle(request);
    } else {
      console.log("colocando token " + token )
      let authRequest = request.clone({
        setHeaders : {
          Authorization: `Bearer ${token}`,
        }
      })
      return next.handle(authRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          // si me devuelve 401, es porque no está autorizado, entonces me devuelve al dashboard (no está autorizado para llevar)
          if (err.status === 401) {
            Swal.fire({
  
              title: 'No está autorizado para este permiso',
              icon: 'error',
              timer: 5000
            });
            this.router.navigateByUrl('/dashboard');
          // 
          }else if (err.status === 400) {
            Swal.fire({
  
              title: 'Existe un error, contacte al administrador',
              icon: 'error',
              timer: 5000
            });
          }
  
          return new Observable<never>();
  
        }))
    }
  }
}
