import {AngularFireAuth} from 'angularfire2/auth';
import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

import {AuthData} from './auth-data.model';
import {TrainingService} from '../training/training.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private _router: Router,
    private _authenticator: AngularFireAuth,
    private _trainingService: TrainingService,
    private _snackBar: MatSnackBar
  ) {}

  initAuthListener() {
    this._authenticator.authState.subscribe(user => {
      if (user) {
        this.authChange.next(true);
        this._router.navigate(['/training']);
        this.isAuthenticated = true;
      } else {
        this._trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this._router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this._authenticator.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => console.log('registration'))
      .catch(({message}) => this.handleError(message));
  }

  login(authData: AuthData) {
    this._authenticator.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => console.log('login'))
      .catch(({message}) => this.handleError(message));
  }

  logout() {
    this._authenticator.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  handleError(message) {
    this._snackBar.open(message, null, {duration: 3000});
  }
}
