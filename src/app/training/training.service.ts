import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import {Subscription} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';
import {UiService} from '../shared/ui.service';
import {Store} from '@ngrx/store';

import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {

  private fbSubs: Subscription[] = [];

  constructor(private _db: AngularFirestore, private _uiService: UiService, private _store: Store<fromTraining.State>) {}

  fetchAvailableExercises() {
    this._store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this._db.collection('availableExercises').snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              calories: doc.payload.doc.data().calories,
              duration: doc.payload.doc.data().duration
            };
          });
        })
      ).subscribe(
        (exercises: Exercise[]) => {
          this._store.dispatch(new UI.StopLoading());
          this._store.dispatch(new Training.SetAvailableTrainings(exercises));
        },
        (error) => {
          this._store.dispatch(new UI.StopLoading());
          this._store.dispatch(new Training.SetAvailableTrainings(null));
          this._uiService.showSnackBar('Exercises Fetching failed. Please try again later.', null, 3000);
        }
      ));
  }

  startExercise(selectedId: string) {
    this._store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this._store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase(Object.assign({}, ex, {date: new Date(), state: 'completed'}));
      this._store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this._store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      const percent = (progress / 100);
      this.addDataToDatabase(Object.assign({}, ex, {
        date: new Date(),
        state: 'cancelled',
        duration: ex.duration * percent,
        calories: ex.calories * percent
      }));
      this._store.dispatch(new Training.StopTraining());
    });
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this._db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this._store.dispatch(new Training.SetFinishedTrainings(exercises));
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  addDataToDatabase(exercise: Exercise) {
    this._db.collection('finishedExercises').add(exercise);
  }
}
