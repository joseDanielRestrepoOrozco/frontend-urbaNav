import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../models/route.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }
  list(): Observable<Route[]> {
    return this.http.get<Route[]>(`${environment.url_ms_urbannav}/routes`);
  }

  show(id:number): Observable<Route> {
    return this.http.get<Route>(`${environment.url_ms_urbannav}/routes/`+id);
  }

  create(newRoute: Route){
    delete newRoute.id;
    return this.http.post(`${environment.url_ms_urbannav}/routes`, newRoute);
  }

  update(newRoute: Route){
    return this.http.put(`${environment.url_ms_urbannav}/routes/${newRoute.id}`, newRoute);
  }

  delete(id: number){
    return this.http.delete(`${environment.url_ms_urbannav}/routes/${id}`);
  }
}
