import {Exercise} from './exercise.model';
import {TrainingActions} from './training.actions';

import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State{
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state: State, action: TrainingActions): State {
  switch (action.type) {
    default:
      return state;
  }
}
