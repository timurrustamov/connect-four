import { Store } from 'react-redux';
import { combineEpics, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import {
  MAKE_A_MOVE,
  makeAMove,
  flagIllegalMove,
  clearIllegalMove,
  addUsersChecker,
  Actions,
  ADD_CHECKER,
  changeCurrentPlayer,
  declareWinner,
  DECLARE_WINNER,
  changeMatchState,
  registerWinningSequence,
  CHANGE_BOARD_DIMENSIONS,
  changeBoardDimensions,
  applyBoardDimensions
} from './actions';
import {
  extractColumnFromGrid,
  getRowId,
  isConsecutive,
  extractRowFromGrid,
  extractRisingDiagonal,
  extractFallingDiagonal
} from 'utils';

import { State, MatchState } from './state';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';

export const IllegalMoveEpic = (action$: ActionsObservable<Actions>, state: Store<State>) => (
  action$.ofType(MAKE_A_MOVE).mergeMap((action: makeAMove): Observable<Actions> => {

    if (state.getState().match.state !== MatchState.InGame) {
      return Observable.of();
    }
    const { columnId } = action.payload;
    const { grid, dimensions: { gridHeight } } = state.getState().board;
    const { currentPlayer } = state.getState();
    const column = extractColumnFromGrid(grid, gridHeight, columnId);
    if (column.every(cell => typeof cell.value !== 'undefined')) {
      return Observable.of(flagIllegalMove(currentPlayer, columnId));
    }
    const { illegalMoves } = state.getState();
    if (illegalMoves.length > 0) {
      return Observable.from([clearIllegalMove(), addUsersChecker(currentPlayer, columnId)]);
    }
    return Observable.of(addUsersChecker(currentPlayer, columnId));
  })
)

export const ChangeCurrentPlayerEpic = (action$: ActionsObservable<Actions>, state: Store<State>) => (
  action$.ofType(ADD_CHECKER).mergeMap((): Observable<Actions> => {
    const { currentPlayer, options } = state.getState();
    return Observable.of(changeCurrentPlayer((currentPlayer + 1) % options.players));
  })
)

export const DetectWinnerEpic = (action$: ActionsObservable<Actions>, state: Store<State>) => (
  action$.ofType(ADD_CHECKER).mergeMap((action: addUsersChecker): Observable<Actions> => {

    const { columnId, userId } = action.payload;
    const { grid, dimensions: { gridHeight } } = state.getState().board;

    const column = extractColumnFromGrid(grid, gridHeight, columnId);
    const latestInsertedCell = column.slice().reverse().find(({ value }) => typeof value !== 'undefined');
    if (!latestInsertedCell) {
      return Observable.of();
    }
    const { index: cellIndex } = latestInsertedCell;

    if (isConsecutive(userId, column)) {
      return Observable.from([
        declareWinner(userId), registerWinningSequence(userId, column)
      ]);
    }

    const rowId = getRowId(cellIndex, gridHeight);
    const row = extractRowFromGrid(grid, gridHeight, rowId);
    if (isConsecutive(userId, row)) {
      return Observable.from([
        declareWinner(userId), registerWinningSequence(userId, row)
      ]);
    }

    const risingDiagonal = extractRisingDiagonal(grid, gridHeight, cellIndex);
    if (isConsecutive(userId, risingDiagonal)) {
      return Observable.from([
        declareWinner(userId), registerWinningSequence(userId, risingDiagonal)
      ]);
    }

    const fallingDiagonal = extractFallingDiagonal(grid, gridHeight, cellIndex);
    if (isConsecutive(userId, fallingDiagonal)) {
      return Observable.from([
        declareWinner(userId), registerWinningSequence(userId, fallingDiagonal)
      ]);
    }

    return Observable.of();
  })
)

const DeclareWinnerEpic = (action$: ActionsObservable<Actions>) => (
  action$.ofType(DECLARE_WINNER).mergeMap((): Observable<Actions> => {
    return Observable.of(changeMatchState(MatchState.Results))
  })
)

const DetectDrawEpic = (action$: ActionsObservable<Actions>, state: Store<State>) => (
  action$.ofType(ADD_CHECKER).mergeMap((): Observable<Actions> => {
    const { match, board } = state.getState();
    if (match.state === MatchState.InGame && !match.winner && board.grid.every(cell => !!cell)) {
      return Observable.of(changeMatchState(MatchState.Draw));
    }
    return Observable.of();
  })
)

const ChangeBoardDimensionsEpic = (action$: ActionsObservable<Actions>, state: Store<State>) => (
  action$.ofType(CHANGE_BOARD_DIMENSIONS).mergeMap((action: changeBoardDimensions): Observable<Actions> => {
    const { gridHeight, gridWidth } = action.payload;
    const { match } = state.getState();
    if (match.state !== MatchState.Menu || gridHeight < 4 || gridWidth < 4 || gridHeight >= 100 || gridHeight >= 100) {
      return Observable.of();
    }
    return Observable.of(applyBoardDimensions(gridWidth, gridHeight));
  })
)

export const RootEpic = combineEpics(
  IllegalMoveEpic,
  ChangeCurrentPlayerEpic,
  DetectWinnerEpic,
  DeclareWinnerEpic,
  DetectDrawEpic,
  ChangeBoardDimensionsEpic
);

export default RootEpic;