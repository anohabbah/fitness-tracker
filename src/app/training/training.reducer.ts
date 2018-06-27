import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Exercise} from './exercise.model';
import {TrainingActions, TrainingActionsType} from './training.actions';

import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state: TrainingState = initialState, action: TrainingActions): TrainingState {
  switch (action.type) {
    case TrainingActionsType.SET_AVAILABLE_TRAININGS:
      return Object.assign({}, state, {availableExercises: action.payload});

    case TrainingActionsType.SET_FINISHED_TRAININGS:
      return Object.assign({}, state, {finishedExercises: action.payload});

    case TrainingActionsType.START_TRAINING:
      return Object.assign({}, state, {
        activeTraining: state.availableExercises.find(ex => ex.id === action.payload)
      });

    case TrainingActionsType.STOP_TRAINING:
      return Object.assign({}, state, {activeTraining: null});

    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);

export const getfinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);

export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);

export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
