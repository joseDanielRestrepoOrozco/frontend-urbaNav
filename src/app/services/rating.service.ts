import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../models/rating.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RatingService {

  constructor(private http: HttpClient) { }
  list(): Observable<Rating[]>{
    return this.http.get<Rating[]>(`${environment.url_ms_urbannav}/ratings`);
  }

  show(id:number): Observable<Rating> {
    return this.http.get<Rating>(`${environment.url_ms_urbannav}/ratings/`+id);
  }

  create(newRating: Rating){
    delete newRating.id;
    return this.http.post(`${environment.url_ms_urbannav}/ratings`, newRating);
  }

  update(newRating: Rating){
    console.log(newRating);
    return this.http.put(`${environment.url_ms_urbannav}/ratings/${newRating.id}`, newRating);
  }

  delete(id: number){
    return this.http.delete(`${environment.url_ms_urbannav}/ratings/${id}`);
  }
}
