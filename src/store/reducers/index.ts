import { State, DefaultState, IndexedBoardGrid } from '../state';
import { combineReducers } from 'redux';
import {
  Actions,
  FLAG_ILLEGAL_MOVE,
  CLEAR_ILLEGAL_MOVE,
  ADD_CHECKER,
  CHANGE_CURRENT_PLAYER,
  CHANGE_MATCH_STATE,
  REGISTER_WINNING_SEQUENCE,
  DECLARE_WINNER,
  APPLY_BOARD_DIMENSIONS,
  SET_OPTIONS,
  CHANGE_THEME
} from '../actions';

export type Reducer<T extends keyof State> = (
  state: State[T],
  action: Actions
) => State[T];

export const board: Reducer<'board'> = (state = DefaultState.board, action) => {
  switch (action.type) {
    case ADD_CHECKER: {
      const { columnId, userId } = action.payload;
      const { gridHeight } = state.dimensions;
      const addedCheckerIndex = state.grid.findIndex(
        (cell, index) =>
          Math.floor(index / gridHeight) === columnId ? cell === null : false
      );
      if (addedCheckerIndex > -1) {
        return {
          ...state,
          grid: state.grid.map((cell, index) => {
            if (index !== addedCheckerIndex) {
              return cell;
            }
            return userId;
          })
        };
      }
      return state;
    }
    case APPLY_BOARD_DIMENSIONS: {
      const { gridHeight, gridWidth } = action.payload;
      if (gridHeight < 4 || gridWidth < 4) {
        return state;
      }
      const grid = Array(gridHeight * gridWidth).fill(null);
      return {
        ...state,
        grid,
        dimensions: {
          gridHeight,
          gridWidth
        }
      };
    }
    default:
      return state;
  }
};

export const currentPlayer: Reducer<'currentPlayer'> = (
  state = DefaultState.currentPlayer,
  action
) => {
  switch (action.type) {
    case CHANGE_CURRENT_PLAYER: {
      return action.payload.userId;
    }
    default:
      return state;
  }
};

export const match: Reducer<'match'> = (state = DefaultState.match, action) => {
  switch (action.type) {
    case CHANGE_MATCH_STATE: {
      return {
        ...state,
        state: action.payload.matchState
      };
    }
    case DECLARE_WINNER: {
      return {
        ...state,
        winner: action.payload.userId
      };
    }
    case REGISTER_WINNING_SEQUENCE: {
      const { sequence, userId } = action.payload;
      const winningSequence = sequence.reduce((acc: IndexedBoardGrid, cell) => {
        if (acc.length >= 4) {
          return acc;
        }
        return cell.value === userId ? acc.concat([cell]) : [];
      }, []);
      return {
        ...state,
        winningSequence
      };
    }
    default:
      return state;
  }
};

export const illegalMoves: Reducer<'illegalMoves'> = (
  state = DefaultState.illegalMoves,
  action
) => {
  switch (action.type) {
    case FLAG_ILLEGAL_MOVE: {
      const { columnId, userId } = action.payload;
      return state.concat({
        columnId,
        userId
      });
    }
    case CLEAR_ILLEGAL_MOVE: {
      return [];
    }
    default:
      return state;
  }
};

export const options: Reducer<'options'> = (
  state = DefaultState.options,
  action
) => {
  switch (action.type) {
    case SET_OPTIONS: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

export const theme: Reducer<'theme'> = (state = DefaultState.theme, action) => {
  switch (action.type) {
    case CHANGE_THEME: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers<State>({
  board,
  currentPlayer,
  match,
  illegalMoves,
  options,
  theme
});
export default rootReducer;
