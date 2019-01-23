import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {AuthService} from '../../services/auth.service';
import {observable, of} from 'rxjs';

@Injectable()
export class ExerciseResolver implements Resolve<Observable<string>> {
  constructor(private auth: AuthService) {}

  resolve() {
    if (this.auth.userProfile) {
     return this.auth.userProfile;
    } else {
      this.auth.getProfile((err, res) => {
        console.log(res , 'res');
        return res;
      });
    }
  }
}
