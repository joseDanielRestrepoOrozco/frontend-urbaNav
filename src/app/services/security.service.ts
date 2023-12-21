import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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

  login2(theUser: User):Observable<any>{
    let headers = new HttpHeaders();
    return this.http.post<string>(`${environment.url_ms_security}/api/public/security/login2`, theUser, { headers, responseType: 'text' as 'json' });
  }

  verifyCode(email: string, code: number): Observable<boolean> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let body = { email: email, code: code };
    return this.http.post<boolean>(`${environment.url_ms_security}/api/public/security/verifyCode`, body, { headers });
  }

  getSessionCode(email: string): Observable<number> {
    let headers = new HttpHeaders();
    let params = new HttpParams().set('email', email);
    return this.http.get<number>(`${environment.url_ms_security}/api/public/security/getSessionCode`, { headers, params });
  }

  deleteSession(userId: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(`${environment.url_ms_security}/private/sessions/delete/${userId}`, { headers });
  }
  
  changePassword(theUser: User):Observable<any>{
    let headers = new HttpHeaders();
    return this.http.post<string>(`${environment.url_ms_security}/api/public/security/changePassword`, theUser, { headers, responseType: 'text' as 'json' });
  }

  verifyCode2(email: string, code: string): Observable<boolean> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let body = { email: email, code: code };
    return this.http.post<boolean>(`${environment.url_ms_security}/api/public/security/verifyCode2`, body, { headers });
  }

  password(userId: string, newPassword: string): Observable<boolean> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let body = { password: newPassword };
    return this.http.put<boolean>(`${environment.url_ms_security}/api/public/security/${userId}/password`, body, { headers });
  }

  password2(currentPassword: string, newPassword: string, confirmPassword: string): Observable<boolean> {
    const body = {
      email: this.userActiveSession.email,
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<boolean>(`${environment.url_ms_security}/api/public/security/password2`, body, { headers });
  }
  

  /**
    * Guarda los datos tales como el identificador
    * y token del usuario en una base de datos
    * interna del navegador llamada local storage
    * @param sessionData información del usuario
    * @returns un booleano que indica si la información
    * fue almacenada correctamente
  */
  saveSessionData(userData) {
    let actualSession = localStorage.getItem('session');
    console.log(userData)
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

  verifyPassword(user_id: string, password: string):Observable<boolean>{
    return this.http.get<boolean>(`${environment.url_ms_security}/api/public/security/isUser/user/${user_id}/password/${password}`);
  }
}
