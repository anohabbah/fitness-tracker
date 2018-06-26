import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;
  loadingSubscription: Subscription;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _uiService: UiService) {}

  ngOnInit() {
    this.loadingSubscription = this._uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
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

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
