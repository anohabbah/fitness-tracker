import {Action} from '@ngrx/store';

export enum UiActionsType {
  START_LOADING = '[UI] Start Loading',
  STOP_LOADING = '[UI] Stop Loading',
}

export class StartLoading implements Action {
  readonly type: string = UiActionsType.START_LOADING;
}

export class StopLoading implements Action {
  readonly type: string = UiActionsType.STOP_LOADING;
}


export type UiActions = StartLoading | StopLoading;
