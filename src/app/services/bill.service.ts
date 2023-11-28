import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bill } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }
  list(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${environment.url_ms_urbannav}/bills`);
  }

  show(id:number): Observable<Bill> {
    return this.http.get<Bill>(`${environment.url_ms_urbannav}/bills/`+id);
  }

  create(newBill: Bill){
    delete newBill._id;
    return this.http.post(`${environment.url_ms_urbannav}/bills`, newBill);
  }

  update(newBill: Bill){
    console.log(newBill);
    return this.http.put(`${environment.url_ms_urbannav}/bills/${newBill._id}`, newBill);
  }

  delete(id: number){
    return this.http.delete(`${environment.url_ms_urbannav}/bills/${id}`);
  }
}
