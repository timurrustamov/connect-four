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
  changeCurrentUser,
  declareWinner,
  DECLARE_WINNER,
  changeMatchState
} from './actions';
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
    const { grid, options } = state.getState().board;
    const { currentUser } = state.getState();
    const column = grid.filter((_, index) => Math.floor(index / options.boardHeight) === columnId);
    if (column.every(cell => typeof cell !== 'undefined')) {
      return Observable.of(flagIllegalMove(currentUser, columnId));
    }
    const { illegalMoves } = state.getState();
    if (illegalMoves.length > 0) {
      return Observable.from([clearIllegalMove(), addUsersChecker(currentUser, columnId)]);
    }
    return Observable.of(addUsersChecker(currentUser, columnId));
  })
)

export const ChangeCurrentPlayerEpic = (action$: ActionsObservable<Actions>, state: Store<State>) => (
  action$.ofType(ADD_CHECKER).mergeMap((): Observable<Actions> => {
    const { currentUser, options } = state.getState();
    return Observable.of(changeCurrentUser((currentUser + 1) % options.players));
  })
)

export const DetectWinnerEpic = (action$: ActionsObservable<Actions>, state: Store<State>) => (
  action$.ofType(ADD_CHECKER).mergeMap((action: addUsersChecker): Observable<Actions> => {

    const { columnId, userId } = action.payload;
    const { grid, options } = state.getState().board;

    const isConsecutive = (data: (number | undefined)[]) => (
      (data.reduce((acc: number, cell) => {
        return (acc >= 4 || cell === userId) ? acc + 1 : 0;
      }, 0) || 0) >= 4
    );
    const column = grid.filter((_, index) => Math.floor(index / options.boardHeight) === columnId);

    const columnConsecutive = isConsecutive(column);
    if (columnConsecutive) {
      console.log(column);
      return Observable.of(declareWinner(userId));
    }

    const rowId = column.lastIndexOf(userId);
    const row = grid.filter((_, index) => index % options.boardHeight === rowId);
    const rowConsecutive = isConsecutive(row);
    if (rowConsecutive) {
      console.log(row);
      return Observable.of(declareWinner(userId));
    }

    const cellId = columnId * options.boardHeight + rowId;

    const risingDiagonal = grid.filter((_, index) => index % options.boardWidth === cellId % options.boardWidth);
    const risingDiagonalConsecutive = isConsecutive(risingDiagonal);
    if (risingDiagonalConsecutive) {
      console.log(risingDiagonal);
      return Observable.of(declareWinner(userId));
    }

    const fallingDiagonal = grid.filter((_, index) => (
      index % (options.boardHeight - 1) === cellId % (options.boardHeight - 1)
    ));
    const fallingDiagonalConsecutive = isConsecutive(fallingDiagonal);
    if (fallingDiagonalConsecutive) {
      console.log(fallingDiagonal);
      return Observable.of(declareWinner(userId));
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

export const RootEpic = combineEpics(
  IllegalMoveEpic,
  ChangeCurrentPlayerEpic,
  DetectWinnerEpic,
  DeclareWinnerEpic,
  DetectDrawEpic
);

export default RootEpic;