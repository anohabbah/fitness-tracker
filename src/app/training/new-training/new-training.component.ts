import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';

import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {Observable} from 'rxjs';
import {UiService} from '../../shared/ui.service';

import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(private _trainingService: TrainingService, private _uiService: UiService, private _store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);
    this.exercises$ = this._store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this._trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this._trainingService.startExercise(form.value.exercise);
  }
}
