


import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {


  uri = 'http://localhost:4000/reviews';

  constructor(private http: HttpClient) {}


  sendmail(mail, msg) {
    console.log('getting mail ', mail);
    msg = encodeURIComponent(msg);
    return this
      .http
      .get(`${this.uri}/submit/${mail}/${msg}`);
  }

  testMail(mail, msg, time) {
    console.log('testy mail ');
    return this
      .http
      .get(`${this.uri}/${mail}/${msg}/${time}`);
  }
}




