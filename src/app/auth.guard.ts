import { AuthService } from './appServices/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService:AuthService,
    private router:Router){}

  canActivate():boolean {
    if(this._authService.loggedIn()) {
      this._authService.isLog=true
      return true
    }else {
      this.router.navigate([''])
      return false
    }
  }
  
}
