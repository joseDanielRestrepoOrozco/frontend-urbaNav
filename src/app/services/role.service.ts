import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  list(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.url_ms_security}/private/roles`);
  }

  show(_id:number): Observable<Role> {
    return this.http.get<Role>(`${environment.url_ms_security}/private/roles/`+_id);
  }

  create(newRole: Role){
    delete newRole._id;
    return this.http.post(`${environment.url_ms_security}/private/roles`, newRole);
  }

  update(newRole: Role){
    return this.http.put(`${environment.url_ms_security}/private/roles/${newRole._id}`, newRole);
  }

  delete(_id: number){
    return this.http.delete(`${environment.url_ms_security}/private/roles/${_id}`);
  }
}
