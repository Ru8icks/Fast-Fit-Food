


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

  testMail(reminderObj) {
    console.log('testy mail ');
    this.http.post(`${this.uri}/addReminder`, reminderObj)
      .subscribe(res => console.log('Done ', res));
  }
}




