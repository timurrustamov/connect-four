import { Store } from 'react-redux';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import {
  extractColumnFromGrid,
  extractFallingDiagonal,
  extractRisingDiagonal,
  extractRowFromGrid,
  getRowId,
  isConsecutive
} from '../utils';
import {
  ADD_CHECKER,
  Actions,
  CHANGE_BOARD_DIMENSIONS,
  CHANGE_MATCH_STATE,
  DECLARE_WINNER,
  MAKE_A_MOVE,
  addUsersChecker,
  applyBoardDimensions,
  changeBoardDimensions,
  changeCurrentPlayer,
  changeMatchState,
  clearIllegalMove,
  declareWinner,
  flagIllegalMove,
  makeAMove,
  registerWinningSequence
} from './actions';
import { MatchState, State } from './state';

/**
 * This epic places checker on board (maybe)
 * @param action$ Stream of actions
 * @param state Current state
 */
export const IllegalMoveEpic = (
  action$: ActionsObservable<Actions>,
  state: Store<State>
) =>
  action$.ofType(MAKE_A_MOVE).mergeMap((action: makeAMove): Observable<
    Actions
  > => {
    if (state.getState().match.state !== MatchState.InGame) {
      return Observable.of();
    }
    const { columnId } = action.payload;
    const { grid, dimensions: { gridHeight } } = state.getState().board;
    const { currentPlayer } = state.getState();
    const column = extractColumnFromGrid(grid, gridHeight, columnId);
    console.log(column);
    if (column.every(cell => cell.value !== null)) {
      return Observable.of(flagIllegalMove(currentPlayer, columnId));
    }
    const { illegalMoves } = state.getState();
    if (illegalMoves.length > 0) {
      return Observable.from([
        clearIllegalMove(),
        addUsersChecker(currentPlayer, columnId)
      ]);
    }
    return Observable.of(addUsersChecker(currentPlayer, columnId));
  });

/**
 * This epic changes the player after a successful move
 * @param action$ Stream of actions
 * @param state Current state
 */
export const ChangeCurrentPlayerEpic = (
  action$: ActionsObservable<Actions>,
  state: Store<State>
) =>
  action$.ofType(ADD_CHECKER).mergeMap((): Observable<Actions> => {
    const { currentPlayer, options } = state.getState();
    return Observable.of(
      changeCurrentPlayer((currentPlayer + 1) % options.players)
    );
  });

/**
 * This epic detects and declares a winner
 * (Psst! All the game logic is in here!)
 */
export const DetectWinnerEpic = (
  action$: ActionsObservable<Actions>,
  state: Store<State>
) =>
  action$.ofType(ADD_CHECKER).mergeMap((action: addUsersChecker): Observable<
    Actions
  > => {
    const { columnId, userId } = action.payload;
    const { grid, dimensions: { gridHeight } } = state.getState().board;

    const column = extractColumnFromGrid(grid, gridHeight, columnId);
    const latestInsertedCell = column
      .slice()
      .reverse()
      .find(({ value }) => value !== null);
    if (!latestInsertedCell) {
      return Observable.of();
    }
    const { index: cellIndex } = latestInsertedCell;

    if (isConsecutive(userId, column)) {
      return Observable.from([
        declareWinner(userId),
        registerWinningSequence(userId, column)
      ]);
    }

    const rowId = getRowId(cellIndex, gridHeight);
    const row = extractRowFromGrid(grid, gridHeight, rowId);
    if (isConsecutive(userId, row)) {
      return Observable.from([
        declareWinner(userId),
        registerWinningSequence(userId, row)
      ]);
    }

    const risingDiagonal = extractRisingDiagonal(grid, gridHeight, cellIndex);
    if (isConsecutive(userId, risingDiagonal)) {
      return Observable.from([
        declareWinner(userId),
        registerWinningSequence(userId, risingDiagonal)
      ]);
    }

    const fallingDiagonal = extractFallingDiagonal(grid, gridHeight, cellIndex);
    if (isConsecutive(userId, fallingDiagonal)) {
      return Observable.from([
        declareWinner(userId),
        registerWinningSequence(userId, fallingDiagonal)
      ]);
    }

    return Observable.of();
  });

/**
 * Stops the game after a winner has been declared!
 */
const DeclareWinnerEpic = (action$: ActionsObservable<Actions>) =>
  action$.ofType(DECLARE_WINNER).mergeMap((): Observable<Actions> => {
    return Observable.of(changeMatchState(MatchState.Results));
  });

/**
 * Detects if the game is a draw
 * @param action$ Stream of actions
 * @param state current state
 */
const DetectDrawEpic = (
  action$: ActionsObservable<Actions>,
  state: Store<State>
) =>
  action$.ofType(ADD_CHECKER).mergeMap((): Observable<Actions> => {
    const { match, board } = state.getState();
    if (
      match.state === MatchState.InGame &&
      !match.winner &&
      board.grid.every(cell => !!cell)
    ) {
      return Observable.of(changeMatchState(MatchState.Draw));
    }
    return Observable.of();
  });

/**
 * Validates a change of dimensions for the game board
 * @param action$ Stream of actions
 * @param state Current state
 */
const ChangeBoardDimensionsEpic = (
  action$: ActionsObservable<Actions>,
  state: Store<State>
) =>
  action$
    .ofType(CHANGE_BOARD_DIMENSIONS)
    .mergeMap((action: changeBoardDimensions): Observable<Actions> => {
      const { gridHeight, gridWidth } = action.payload;
      const { match } = state.getState();
      if (
        match.state !== MatchState.Menu ||
        gridHeight < 4 ||
        gridWidth < 4 ||
        gridHeight >= 100 ||
        gridHeight >= 100
      ) {
        return Observable.of();
      }
      return Observable.of(applyBoardDimensions(gridWidth, gridHeight));
    });

/**
 * Reinitializes the game board just before the game start
 */
const ReinitializeGameBoard = (
  action$: ActionsObservable<Actions>,
  state: Store<State>
) =>
  action$
    .ofType(CHANGE_MATCH_STATE)
    .mergeMap((action: changeMatchState): Observable<Actions> => {
      const { matchState } = action.payload;
      if (matchState === MatchState.InGame) {
        const { gridWidth, gridHeight } = state.getState().board.dimensions;
        return Observable.from([
          applyBoardDimensions(gridWidth, gridHeight),
          registerWinningSequence(-1, [])
        ]);
      }
      return Observable.of();
    });

/**
 * The main epic for connect-four project!
 */
export const RootEpic = combineEpics(
  IllegalMoveEpic,
  ChangeCurrentPlayerEpic,
  DetectWinnerEpic,
  DeclareWinnerEpic,
  DetectDrawEpic,
  ChangeBoardDimensionsEpic,
  ReinitializeGameBoard
);

export default RootEpic;
