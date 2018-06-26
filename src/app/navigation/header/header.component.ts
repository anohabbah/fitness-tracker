import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../auth/auth.reducer';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private _store: Store<fromRoot.State>, private _authService: AuthService) {}

  ngOnInit() {
    this.isAuth$ = this._store.select(fromRoot.getIsAuthenticated);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this._authService.logout();
  }
}
