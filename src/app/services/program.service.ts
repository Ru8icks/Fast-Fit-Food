import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {


  uri = 'http://localhost:4000/reviews';

  constructor(private http: HttpClient) { }


  addProgram(program, nickname, name) {
    const obj = {
      program: program,
      name: name,
      author: nickname,
    };
    console.log(obj);
    this.http.post(`${this.uri}/addProgram`, obj)
      .subscribe(res => console.log('Done ', res));
  }
  getPrograms(id) {
    console.log('get programs ', id);
    return this
      .http
      .get(`${this.uri}/getPrograms/${id}`);
  }

  updateProgram(program, nickname , name, id) {
    console.log('update program')
    const obj = {
      program: program,
      name: name,
      author: nickname,
    };
    this
      .http
      .post(`${this.uri}/updateProgram/${id}`, obj)
      .subscribe(res => console.log('Done'));
    return this.http.get(`${this.uri}`);
  }

  deleteProgram(id) {
    console.log('del program');
    return this
      .http
      .get(`${this.uri}/deleteProgram/${id}`).subscribe(res => console.log('Done ', res));
  }


  getProgram(id) {
    console.log('get program ');
    return this
      .http
      .get(`${this.uri}/getProgram/${id}`);
  }
}
