import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {


  uri = 'http://localhost:4000/reviews';

  constructor(private http: HttpClient) { }


  addProgram(program, nickname) {
    const obj = {
      program: program,
      author: nickname
    };
    console.log(obj)
    this.http.post(`${this.uri}/addProgram`, obj)
      .subscribe(res => console.log('Done ', res));
  }
  getProgram(id) {
    console.log('get program ');
    return this
      .http
      .get(`${this.uri}/getProgram/${id}`);
  }

  deleteProgram(id) {
    console.log('del program');
    return this
      .http
      .get(`${this.uri}/deleteProgram/${id}`).subscribe(res => console.log('Done ', res));
  }


}
