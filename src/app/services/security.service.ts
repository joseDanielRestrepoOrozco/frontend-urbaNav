import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  theUser = new BehaviorSubject<User>(new User);
  constructor(private http: HttpClient, private router: Router) {
    this.verifySession()
  }
  /**
    * Permite obtener la información de usuario
    * que tiene la función activa y servirá
    * para acceder a la información del token
  */
  public get userActiveSession(): User {
    return this.theUser.value;
  }
  /**
    * Permite actualizar la información del usuario
    * que acabó de validarse correctamente
    * @param user información del usuario logueado
  */
  setUser(user: User) {
    this.theUser.next(user);
  }
  /**
    * Permite obtener la información del usuario
    * con datos tales como el identificador y el token
    * @returns
  */
  getUser() {
    return this.theUser.asObservable();
  }
  /**
    * Realiza la petición al backend con el correo y la contraseña
    * para verificar si existe o no en la plataforma
    * @param theUser JSON con la información de correo y contraseña
    * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
  */
  login(theUser: User):Observable<any>{
    let headers = new HttpHeaders();
    return this.http.post<string>(`${environment.url_ms_security}/api/public/security/login`, theUser, { headers, responseType: 'text' as 'json' });
  }

  changePassword(theUser: User):Observable<any>{
    let headers = new HttpHeaders();
    return this.http.post<string>(`${environment.url_ms_security}/api/public/security/changePassword`, theUser, { headers, responseType: 'text' as 'json' });
  }

  /**
    * Guarda los datos tales como el identificador
    * y token del usuario en una base de datos
    * interna del navegador llamada local storage
    * @param sessionData información del usuario
    * @returns un booleano que indica si la información
    * fue almacenada correctamente
  */
  saveSessionData(userData: User) {
    let actualSession = localStorage.getItem('session');
    if (actualSession) {
      return false;
    } else {
      localStorage.setItem('session', JSON.stringify(userData));
      localStorage.setItem('userId', userData._id);
      this.setUser(userData)
      return true;
    }
    
  }

  verifySession() {
    let theSesion = this.getSessionData();
    if (theSesion) {
      this.setUser(JSON.parse(theSesion));
    }
  }
  /**
    * Verifica si hay una sesion activa
    * @returns
  */

  sessionExists(): boolean {
    let theSession = this.getSessionData();
    return (theSession) ? true : false;
  }
  /**
    * Permite obtener los dato de la sesión activa en el
    * local storage
    * @returns
  */

  getSessionData() {
    let actualSession = localStorage.getItem('session');
    return actualSession;
  }
  /**
    * Permite cerrar la sesión del usuario
    * que estaba previamente logueado
  */
  logout() {
    localStorage.removeItem('session');
    this.setUser(new User());
  }

  getUserFromToken(token: string):Observable<User>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${environment.url_ms_security}/api/public/security/token-validation`, { headers });
  }

}
