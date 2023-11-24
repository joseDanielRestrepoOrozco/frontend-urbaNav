import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pqrs } from '../models/pqrs.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  constructor(private http: HttpClient) { }

  list(): Observable<Pqrs[]> {
    console.log(this.http.get<Pqrs[]>(`${environment.url_ms_security}/private/pqrs`).forEach((m)=>{console.log(m)}));
    
    return this.http.get<Pqrs[]>(`${environment.url_ms_security}/private/pqrs`);
  }

  show(_id:number): Observable<Pqrs> {
    return this.http.get<Pqrs>(`${environment.url_ms_security}/private/pqrs/`+_id);
  }

  create(newPqrs: Pqrs){
    delete newPqrs._id;
    return this.http.post(`${environment.url_ms_security}/private/pqrs`, newPqrs);
  }

  update(newPqrs: Pqrs){
    return this.http.put(`${environment.url_ms_security}/private/pqrs/${newPqrs._id}`, newPqrs);
  }

  delete(_id: number){
    return this.http.delete(`${environment.url_ms_security}/private/pqrs/${_id}`);
  }
}
