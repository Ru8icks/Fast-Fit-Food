import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Program} from '../interfaces/program';



@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private programs: Array<Program>;
  observableProgram;

  uri = 'http://localhost:4000/reviews';

  constructor(private http: HttpClient) {
    this.programs = new Array<Program>();

    this.observableProgram = new BehaviorSubject<Program[]>(this.programs);
  }

  eventChange() {
    console.log('sort ', this.programs);
    this.programs.sort((a, b) => (a.name.toString().toLocaleLowerCase() > b.name.toString().toLocaleLowerCase()) ? 1 : -1);
    console.log('sort ', this.programs);
    this.observableProgram.next(this.programs);
  }

  addProgram(program, nickname, name) {
    const obj = {
      program: program,
      name: name,
      author: nickname,
    };
    console.log(obj);
    this.http.post(`${this.uri}/addProgram`, obj)
      .subscribe(res => {
        console.log('Done ', res);
        this.programs.push(obj);
        this.eventChange();
      });
  }

  getPrograms(id) {
    console.log('get programs ', id);
    this.programs.splice(0, this.programs.length);
    this.http.get(`${this.uri}/getPrograms/${id}`).subscribe(res => {
      console.log(res);
      for (const program of res) {
        this.programs.push(program);
      }
      console.log(this.programs);
      this.eventChange();
    });
  }
  // getPrograms(id) {
  //   console.log('get programs ', id);
  //   return this
  //     .http
  //     .get(`${this.uri}/getPrograms/${id}`);
  //  }

  updateProgram(program, nickname, name, id) {
    console.log('update program');
    const obj = {
      program: program,
      name: name,
      author: nickname,
    };
    this
      .http
      .post(`${this.uri}/updateProgram/${id}`, obj)
      .subscribe(res => {
        console.log('Done');
        this.programs = this.programs.filter(programs => programs._id !== id);
        this.programs.push(obj);
        this.eventChange();
      });
    return this.http.get(`${this.uri}`);
  }

  deleteProgram(id) {
    console.log('del program');
    return this
      .http
      .get(`${this.uri}/deleteProgram/${id}`).subscribe(res => {
        console.log('Done ', res);
        this.programs = this.programs.filter(program => program._id !== id);
        this.eventChange();
      });
  }


  getProgram(id) {
    console.log('get program ');
    return this
      .http
      .get(`${this.uri}/getProgram/${id}`);
  }

}
