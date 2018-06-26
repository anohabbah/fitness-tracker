import {AngularFireAuth} from 'angularfire2/auth';
import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {AuthData} from './auth-data.model';
import {TrainingService} from '../training/training.service';
import {UiService} from '../shared/ui.service';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {

  constructor(
    private _router: Router,
    private _authenticator: AngularFireAuth,
    private _trainingService: TrainingService,
    private _snackBar: MatSnackBar,
    private _uiService: UiService,
    private _store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this._authenticator.authState.subscribe(user => {
      if (user) {
        this._store.dispatch(new Auth.SetAuthenticated());
        this._router.navigate(['/training']);
      } else {
        this._store.dispatch(new Auth.SetUnauthenticated());
        this._trainingService.cancelSubscriptions();
        this._router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this._store.dispatch(new UI.StartLoading());
    this._authenticator.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this._store.dispatch(new UI.StopLoading());
      })
      .catch(({message}) => {
        this._store.dispatch(new UI.StopLoading());
        this._uiService.showSnackBar(message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this._store.dispatch(new UI.StartLoading());
    this._authenticator.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this._store.dispatch(new UI.StopLoading());
      })
      .catch(({message}) => {
        this._store.dispatch(new UI.StopLoading());
        this._uiService.showSnackBar(message, null, 3000);
      });
  }

  logout() {
    this._authenticator.auth.signOut();
  }
}
