import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../auth/auth.reducer';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  isAuth$: Observable<boolean>;

  constructor(private _authService: AuthService, private _store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isAuth$ = this._store.select(fromRoot.getIsAuthenticated);
  }

  onLogout() {
    this._authService.logout();
  }
}
