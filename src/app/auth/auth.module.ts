import {AngularFireAuthModule} from 'angularfire2/auth';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';

import {AuthRoutingModule} from './auth-routing.module';

import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

@NgModule({
  imports: [ReactiveFormsModule, AngularFireAuthModule, SharedModule, AuthRoutingModule],
  declarations: [LoginComponent, SignupComponent]
})
export class AuthModule {}
