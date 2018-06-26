import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UiService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private _snackBar: MatSnackBar) {}

  showSnackBar(message, action, duration) {
    this._snackBar.open(message, action, {
      duration: duration
    });
  }
}
