import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.auth.login();
      return false;
    }
    return true;
  }

}
