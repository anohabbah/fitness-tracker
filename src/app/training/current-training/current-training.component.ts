import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';

import * as fromTraining from '../training.reducer';

import {StopTrainingComponent} from './stop-training.component';
import {TrainingService} from '../training.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;

  constructor(private _dialog: MatDialog, private _trainingService: TrainingService, private _store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this._store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          this._trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    });
  }

  onStop() {
    clearInterval(this.timer);
    const $dialogRef = this._dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    $dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
