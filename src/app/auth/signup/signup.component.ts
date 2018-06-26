import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Observable, Subscription} from 'rxjs';
import {UiService} from '../../shared/ui.service';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  isLoading$: Observable<boolean>;
  loadingSubs: Subscription;

  constructor(private _authService: AuthService, private _uiService: UiService, private _store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this._authService.registerUser(form.value);
  }
}
