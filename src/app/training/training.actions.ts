import {Action} from '@ngrx/store';
import {Exercise} from './exercise.model';

export enum TrainingActionsType {
  SET_AVAILABLE_TRAININGS = '[TRAINING] Set Available Trainings',
  SET_FINISHED_TRAININGS = '[TRAINING] Set Finished Trainings',
  START_TRAINING = '[TRAINING] Start Training',
  STOP_TRAINING = '[TRAINING] Stop Training',
}

export class SetAvailableTrainings implements Action {
  readonly type: string = TrainingActionsType.SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type: string = TrainingActionsType.SET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type: string = TrainingActionsType.START_TRAINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type: string = TrainingActionsType.STOP_TRAINING;

  constructor(public payload?: any) {}
}

export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining;
