import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Point } from '../models/point';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private http: HttpClient) { }

  list(): Observable<Point[]> {
    // console.log(this.http.get<Point[]>(`${environment.url_ms_urbannav}/points`).forEach((point)=> console.log(point)));
    return this.http.get<Point[]>(`${environment.url_ms_urbannav}/points`);
  }
  show(id: number): Observable<Point> {
    return this.http.get<Point>(`${environment.url_ms_urbannav}/points/${id}`);
  }
  create(point: Point) {
    delete point.id
    return this.http.post(`${environment.url_ms_urbannav}/points`, point);
  }
  update(point: Point) {
    return this.http.put(`${environment.url_ms_urbannav}/points/${point.id}`, point);
  }
  delete(id: number) {
    return this.http.delete(`${environment.url_ms_urbannav}/points/${id}`);
  }
}
