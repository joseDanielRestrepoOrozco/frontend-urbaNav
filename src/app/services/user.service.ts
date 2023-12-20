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
    // console.log(this.http.get<User[]>(`${environment.url_ms_security}/private/users`).forEach((m) => { console.log(m) }));

    return this.http.get<User[]>(`${environment.url_ms_security}/private/users`);
  }


  show(_id: number): Observable<User> {
    return this.http.get<User>(`${environment.url_ms_security}/private/users/` + _id);
  }

  create(newUser: User) {
    delete newUser._id;
    return this.http.post(`${environment.url_ms_security}/private/users`, newUser);
  }

  update(newUser: User) {
    return this.http.put(`${environment.url_ms_security}/private/users/${newUser._id}`, newUser);
  }

  delete(_id: number, role: string) {
    if (role === "CONDUCTOR") {
      this.http.get<any[]>(`${environment.url_ms_urbannav}/drivers`).subscribe((json: any) => {
        json.drivers.forEach(driver => {
          if (driver.user_id === _id) {
            this.http.delete<any[]>(`${environment.url_ms_urbannav}/drivers/` + _id)
          }
        });
      })
    }
    if (role === "CLIENTE") {
      this.http.get<any[]>(`${environment.url_ms_urbannav}/customers`).subscribe((json: any) => {
        console.log(json.customers)
        json.customers.forEach(customer => {
          if (customer.user_id === _id) {
            this.http.delete<any[]>(`${environment.url_ms_urbannav}/customers/` + _id)
          }
        });
      })
    }
    //return this.http.delete(`${environment.url_ms_security}/private/users/${_id}`);
  }
}
