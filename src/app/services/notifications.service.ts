import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  changePassword(newNotification: any){
    delete newNotification.id;
    delete newNotification.customer;
    return this.http.post(`${environment.url_ms_notifications}/change_password`, newNotification);
  }

  sendEmail(newNotification: any){
    delete newNotification.id;
    delete newNotification.customer;
    return this.http.post(`${environment.url_ms_notifications}/send_email`, newNotification);
  }

  sendBill(newNotification: any){
    delete newNotification.id;
    delete newNotification.customer;
    return this.http.post(`${environment.url_ms_notifications}/send_bill`, newNotification);
  }

  sendPanic(newNotification: any){
    delete newNotification.id;
    delete newNotification.customer;
    return this.http.post(`${environment.url_ms_notifications}/send_panic`, newNotification);
  }
}
