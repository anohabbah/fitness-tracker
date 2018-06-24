import {AngularFirestore} from 'angularfire2/firestore';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {map} from 'rxjs/operators';

import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>;

  constructor(private _trainingService: TrainingService) {}

  ngOnInit() {
    this.exercises = this._trainingService.exercisesChanged;
    this._trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this._trainingService.startExercise(form.value.exercice);
  }
}
