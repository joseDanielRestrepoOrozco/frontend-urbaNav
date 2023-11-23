import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }
  list(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.url_ms_urbannav}/vehicles`);
  }

  show(id:number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.url_ms_urbannav}/vehicles/`+id);
  }

  create(newVehicle: Vehicle){
    delete newVehicle.id;
    return this.http.post(`${environment.url_ms_urbannav}/vehicles`, newVehicle);
  }

  update(newVehicle: Vehicle){
    console.log(newVehicle);
    
    return this.http.put(`${environment.url_ms_urbannav}/vehicles/${newVehicle.id}`, newVehicle);
  }

  delete(id: number){
    return this.http.delete(`${environment.url_ms_urbannav}/vehicles/${id}`);
  }
}
