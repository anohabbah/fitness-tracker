import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.isAuth()) {
      return true;
    }

    this._router.navigate(['/login']);
    return false;
  }

  canLoad(route: Route): boolean {
    if (this._authService.isAuth()) {
      return true;
    }

    this._router.navigate(['/login']);
    return false;
  }
}
