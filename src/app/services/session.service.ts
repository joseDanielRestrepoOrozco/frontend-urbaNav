import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../models/session.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  list(): Observable<Session[]> {
    return this.http.get<Session[]>(`${environment.url_ms_security}/private/sessions`);
  }

  show(_id:number): Observable<Session> {
    return this.http.get<Session>(`${environment.url_ms_security}/private/sessions/`+_id);
  }

  create(newSession: Session){
    delete newSession._id;
    return this.http.post(`${environment.url_ms_security}/private/sessions`, newSession);
  }

  update(newSession: Session){
    return this.http.put(`${environment.url_ms_security}/private/sessions/${newSession._id}`, newSession);
  }

  delete(_id: number){
    return this.http.delete(`${environment.url_ms_security}/private/sessions/${_id}`);
  }
}
