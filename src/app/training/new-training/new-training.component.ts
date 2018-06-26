import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';

import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {Observable, Subscription} from 'rxjs';
import {UiService} from '../../shared/ui.service';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading$: Observable<boolean>;
  private exercisesSubs: Subscription;

  constructor(private _trainingService: TrainingService, private _uiService: UiService, private _store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);
    this.exercisesSubs = this._trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this._trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this._trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.exercisesSubs) {
      this.exercisesSubs.unsubscribe();
    }
  }
}
