import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {AuthService} from '../../services/auth.service';

@Injectable()
export class ExerciseResolver implements Resolve<Observable<string>> {
  constructor(private auth: AuthService) {}

  resolve() {
    let profile;
    if (this.auth.userProfile !== undefined) {
      profile = this.auth.userProfile;
      console.log('this.auth.userProfile ', profile);
    } else {
      this.auth.getProfile((err, res) => {
        console.log('else ')
        profile = res;
      });
    }
    return profile;
  }
}
