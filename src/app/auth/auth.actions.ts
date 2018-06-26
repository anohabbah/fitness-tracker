import {Action} from '@ngrx/store';

export enum AuthActionsType {
  SET_AUTHENTICATED = '[AUTH] Set Authenticated',
  SET_UNAUTHENTICATED = '[AUTH] Set Unuthenticated',
}

export class SetAuthenticated implements Action {
  readonly type: string = AuthActionsType.SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type: string = AuthActionsType.SET_UNAUTHENTICATED;
}


export type AuthActions = SetAuthenticated | SetUnauthenticated;
