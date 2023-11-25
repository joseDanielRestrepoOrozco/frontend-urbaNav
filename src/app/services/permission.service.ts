import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  list(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.url_ms_security}/private/permissions`);
  }

  show(_id:string): Observable<Permission> {
    return this.http.get<Permission>(`${environment.url_ms_security}/private/permissions/`+_id);
  }

  create(newPermission: Permission){
    delete newPermission._id;
    return this.http.post(`${environment.url_ms_security}/private/permissions`, newPermission);
  }

  update(newPermission: Permission){
    return this.http.put(`${environment.url_ms_security}/private/permissions/${newPermission._id}`, newPermission);
  }

  delete(_id: string){
    return this.http.delete(`${environment.url_ms_security}/private/permissions/${_id}`);
  }
}
