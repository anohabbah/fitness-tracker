import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UiService} from '../../shared/ui.service';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _uiService: UiService,
    private _store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);
    this.createForm();
  }

  createForm() {
    this.form = this._fb.group({
      'email': ['', [Validators.email, Validators.required]],
      'password': ['', Validators.required]
    });
  }

  onSubmit() {
    this._authService.login(this.form.value);
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
