import {Action} from '@ngrx/store';

export enum TrainingActionsType {
  SET_AVAILABLE_TRAINING= '[TRAINING] Set Available Training',
  SET_FINISHED_TRAINING= '[TRAINING] Set Finished Training',
  START_TRAINING = '[TRAINING] Start Training',
  STOP_TRAINING = '[TRAINING] Stop Training',
}

export class FetchAvailableExercises implements Action {
  readonly type: string = TrainingActionsType.SET_AVAILABLE_TRAINING;
}

export class FetchFinishedExercises implements Action {
  readonly type: string = TrainingActionsType.SET_FINISHED_TRAINING;
}

export type TrainingActions = FetchAvailableExercises | FetchFinishedExercises;
