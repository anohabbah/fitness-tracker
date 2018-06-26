import {AngularFireAuth} from 'angularfire2/auth';
import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';

import {AuthData} from './auth-data.model';
import {TrainingService} from '../training/training.service';
import {UiService} from '../shared/ui.service';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

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
    // this._uiService.loadingStateChanged.next(true);
    this._store.dispatch(new UI.StartLoading());
    this._authenticator.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        // this._uiService.loadingStateChanged.next(false)
        this._store.dispatch(new UI.StopLoading());
      })
      .catch(({message}) => {
        // this._uiService.loadingStateChanged.next(false);
        this._store.dispatch(new UI.StopLoading());
        this._uiService.showSnackBar(message, null, 3000);
      });
  }

  login(authData: AuthData) {
    // this._uiService.loadingStateChanged.next(true);
    this._store.dispatch(new UI.StartLoading());
    this._authenticator.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        // this._uiService.loadingStateChanged.next(false)
        this._store.dispatch(new UI.StopLoading());
      })
      .catch(({message}) => {
        // this._uiService.loadingStateChanged.next(false);
        this._store.dispatch(new UI.StopLoading());
        this._uiService.showSnackBar(message, null, 3000);
      });
  }

  logout() {
    this._authenticator.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
