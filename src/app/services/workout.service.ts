import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  uri = 'http://localhost:4000/reviews';

  constructor(private http: HttpClient) { }


  addWorkout(sets, nickname, name) {
    const obj = {
      sets: sets,
      programName: name,
      author: nickname,
      date: new Date(),
    };
    console.log(obj);
    this.http.post(`${this.uri}/addWorkout`, obj)
      .subscribe(res => console.log('Done ', res));
  }
  getWorkouts(id) {
    console.log('get workout ', id);
    return this
      .http
      .get(`${this.uri}/getWorkout/${id}`);
  }
}
