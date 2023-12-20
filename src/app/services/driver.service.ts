import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }
  
  create(driver: User) {
    delete driver._id
    return this.http.post(`${environment.url_ms_urbannav}/drivers`, driver);
  }
}
