import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  list(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${environment.url_ms_urbannav}/trips`);
  }

  show(id:number): Observable<Trip> {
    return this.http.get<Trip>(`${environment.url_ms_urbannav}/trips/`+id);
  }

  create(newTrip: Trip){
    delete newTrip.id;
    return this.http.post(`${environment.url_ms_urbannav}/trips`, newTrip);
  }

  update(newTrip: Trip){
    return this.http.put(`${environment.url_ms_urbannav}/trips/${newTrip.id}`, newTrip);
  }

  delete(id: number){
    return this.http.delete(`${environment.url_ms_urbannav}/trips/${id}`);
  }
}