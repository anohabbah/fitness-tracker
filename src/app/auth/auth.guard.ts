import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import * as fromRoot from './auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _store: Store<fromRoot.State>, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }

  canLoad(route: Route): Observable<boolean> {
    return this._store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }
}
