import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  update(driver) {
    return this.http.put(`${environment.url_ms_urbannav}/drivers/${driver.id}`, driver);
  }

  showForUser(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_urbannav}/drivers2/${id}`);
  }

  showForUserCustomer(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_urbannav}/customers2/${id}`);
  }
}
