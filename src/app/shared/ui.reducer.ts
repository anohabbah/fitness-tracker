import {UiActions, UiActionsType} from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(state: State = initialState, action: UiActions): State {
  switch (action.type) {
    case UiActionsType.START_LOADING:
      return {
        isLoading: true
      };

    case UiActionsType.STOP_LOADING:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
