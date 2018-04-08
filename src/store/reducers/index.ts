import { State, DefaultState } from '../state';
import { combineReducers } from 'redux';
import {
  Actions,
  FLAG_ILLEGAL_MOVE,
  CLEAR_ILLEGAL_MOVE,
  ADD_CHECKER,
  CHANGE_CURRENT_USER,
  CHANGE_MATCH_STATE
} from '../actions';

export type Reducer<T extends keyof State> = (state: State[T], action: Actions) => State[T];

export const board: Reducer<'board'> = (state = DefaultState.board, action) => {
  switch (action.type) {
    case ADD_CHECKER: {
      const { columnId, userId } = action.payload;
      const { boardHeight } = state.options;
      const addedCheckerIndex = state.grid.findIndex((cell, index) => (
        Math.floor(index / boardHeight) === columnId ? typeof cell === 'undefined' : false
      ));
      if (addedCheckerIndex > -1) {
        return {
          grid: state.grid.map((cell, index) => {
            if (index !== addedCheckerIndex) {
              return cell;
            }
            return userId;
          }),
          options: state.options
        }
      }
      return state;
    }
    default:
      return state;
  }
}

export const currentUser: Reducer<'currentUser'> = (state = DefaultState.currentUser, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_USER: {
      return action.payload.userId;
    }
    default:
      return state;
  }
}

export const match: Reducer<'match'> = (state = DefaultState.match, action) => {
  switch (action.type) {
    case CHANGE_MATCH_STATE: {
      return {
        ...state,
        state: action.payload.matchState
      }
    }
    default:
      return state;
  }
}

export const illegalMoves: Reducer<'illegalMoves'> = (state = DefaultState.illegalMoves, action) => {
  switch (action.type) {
    case FLAG_ILLEGAL_MOVE: {
      const { columnId, userId } = action.payload;
      return state.concat({
        columnId,
        userId
      })
    }
    case CLEAR_ILLEGAL_MOVE: {
      return [];
    }
    default:
      return state;
  }
}

export const options: Reducer<'options'> = (state = DefaultState.options, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  board,
  currentUser,
  match,
  illegalMoves,
  options
})
export default rootReducer;