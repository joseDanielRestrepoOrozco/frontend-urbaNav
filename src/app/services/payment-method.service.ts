import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../models/payment-method.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private http: HttpClient) { }

  list(): Observable<PaymentMethod[]> {
    console.log(this.http.get<PaymentMethod[]>(`${environment.url_ms_security}/private/paymentmethod`).forEach((m)=>{console.log(m)}));
    
    return this.http.get<PaymentMethod[]>(`${environment.url_ms_security}/private/paymentmethod`);
  }

  show(_id:number): Observable<PaymentMethod> {
    return this.http.get<PaymentMethod>(`${environment.url_ms_security}/private/paymentmethod/`+_id);
  }

  create(newPaymentmethod: PaymentMethod){
    delete newPaymentmethod._id;
    return this.http.post(`${environment.url_ms_security}/private/paymentmethod`, newPaymentmethod);
  }

  update(newPaymentmethod: PaymentMethod){
    return this.http.put(`${environment.url_ms_security}/private/paymentmethod/${newPaymentmethod._id}`, newPaymentmethod);
  }

  delete(_id: number){
    return this.http.delete(`${environment.url_ms_security}/private/paymentmethod/${_id}`);
  }

  matchPaymentMethodUser(paymentMethod_id: string, user_id: string){
    return this.http.put(`${environment.url_ms_security}/private/paymentmethod/${paymentMethod_id}/user/${user_id}`, null);
  }

}
