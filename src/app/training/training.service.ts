import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private fbSubs: Subscription[] = [];

  private availableExercises: Exercise[] = [];

  private runningExercise: Exercise;

  constructor(private _db: AngularFirestore) {
  }

  fetchAvailableExercises() {
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
      ).subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }));
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    const percent = (progress / 100);
    this.addDataToDatabase(Object.assign({}, this.runningExercise, {
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * percent,
      calories: this.runningExercise.calories * percent
    }));
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this._db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  addDataToDatabase(exercise: Exercise) {
    this._db.collection('finishedExercises').add(exercise);
  }
}
