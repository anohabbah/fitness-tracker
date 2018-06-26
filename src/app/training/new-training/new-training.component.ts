import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {Subscription} from 'rxjs';
import {UiService} from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading = true;
  private loadingSubs: Subscription;
  private exercisesSubs: Subscription;

  constructor(private _trainingService: TrainingService, private _uiService: UiService) {
  }

  ngOnInit() {
    this.loadingSubs = this._uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
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
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
    if (this.exercisesSubs) {
      this.exercisesSubs.unsubscribe();
    }
  }
}
