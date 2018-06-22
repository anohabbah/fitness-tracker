import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy{
  isAuth = false;
  authSubscription: Subscription;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this._authService.authChange.subscribe(authStatus => this.isAuth = authStatus);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this._authService.logout();
  }
}
