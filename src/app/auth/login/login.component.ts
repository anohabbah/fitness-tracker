import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService) {}

  ngOnInit() {
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
