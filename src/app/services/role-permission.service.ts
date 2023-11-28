import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RolePermission } from '../models/role-permission.model';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  constructor(private http: HttpClient) { }

  list(): Observable<RolePermission[]> {
    console.log(this.http.get<RolePermission[]>(`${environment.url_ms_security}/private/role-permission`).forEach((m)=>{console.log(m)}));
    
    return this.http.get<RolePermission[]>(`${environment.url_ms_security}/private/role-permission`);
  }

  show(_id:string): Observable<RolePermission> {
    return this.http.get<RolePermission>(`${environment.url_ms_security}/private/role-permission/${_id}`);
  }

  create(role_id: string, permission_id: string ){
    return this.http.post(`${environment.url_ms_security}/private/role-permission/role/${role_id}/permission/${permission_id}`, null);
  }

  update(newRolepermission: RolePermission){
    return this.http.put(`${environment.url_ms_security}/private/role-permission/${newRolepermission._id}`, newRolepermission);
  }

  delete(_id: number){
    return this.http.delete(`${environment.url_ms_security}/private/role-permission/${_id}`);
  }
}
