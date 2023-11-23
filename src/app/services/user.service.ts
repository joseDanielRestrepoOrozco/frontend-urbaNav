import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  list(): Observable<User[]> {
    console.log(this.http.get<User[]>(`${environment.url_ms_security}/private/users`).forEach((m)=>{console.log(m)}));
    
    return this.http.get<User[]>(`${environment.url_ms_security}/private/users`);
  }

  show(_id:number): Observable<User> {
    return this.http.get<User>(`${environment.url_ms_security}/private/users/`+_id);
  }

  create(newUser: User){
    delete newUser._id;
    return this.http.post(`${environment.url_ms_security}/private/users`, newUser);
  }

  update(newUser: User){
    return this.http.put(`${environment.url_ms_security}/private/users/${newUser._id}`, newUser);
  }

  delete(_id: number){
    return this.http.delete(`${environment.url_ms_security}/private/users/${_id}`);
  }
}
