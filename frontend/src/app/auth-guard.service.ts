// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    var a = this.auth.isAuthenticated();
    console.log(a);
    console.log(a);
    if (!a) {
      console.log("not logged")
      this.router.navigate(['auth/login']);
      return false;
    }
    console.log("logged in")
    return true;
  }
}