import createAction from './create-action'
import { UserId, State, MatchState, IndexedBoardGrid } from '../state';

export const MAKE_A_MOVE = '[game/users epic] Make A Move'
export const makeAMove = (columnId: number) =>
  createAction(MAKE_A_MOVE, { columnId });
export type makeAMove = ReturnType<typeof makeAMove>

export const ADD_CHECKER = '[game effect] Add Checker'
export const addUsersChecker = (userId: UserId, columnId: number) =>
  createAction(ADD_CHECKER, { userId, columnId });
export type addUsersChecker = ReturnType<typeof addUsersChecker>;

export const FLAG_ILLEGAL_MOVE = '[game effect] Flag Illegal Move'
export const flagIllegalMove = (userId: UserId, columnId: number) =>
  createAction(FLAG_ILLEGAL_MOVE, { userId, columnId });
export type flagIllegalMove = ReturnType<typeof flagIllegalMove>;

export const CLEAR_ILLEGAL_MOVE = '[game effect] Clear Illegal Move Flag'
export const clearIllegalMove = () => createAction(CLEAR_ILLEGAL_MOVE);
export type clearIllegalMove = ReturnType<typeof clearIllegalMove>;

export const CHANGE_CURRENT_PLAYER = '[users effect] Change Current User'
export const changeCurrentPlayer = (userId: UserId) =>
  createAction(CHANGE_CURRENT_PLAYER, { userId });
export type changeCurrentPlayer = ReturnType<typeof changeCurrentPlayer>;

export const CHANGE_MATCH_STATE = '[game effect] Change Game State';
export const changeMatchState = (matchState: MatchState) =>
  createAction(CHANGE_MATCH_STATE, { matchState });
export type changeMatchState = ReturnType<typeof changeMatchState>;

export const DECLARE_WINNER = '[game effect] Declare Winner';
export const declareWinner = (userId: UserId) =>
  createAction(DECLARE_WINNER, { userId });
export type declareWinner = ReturnType<typeof declareWinner>;

export const REGISTER_WINNING_SEQUENCE = '[game effect] Winning Sequence';
export const registerWinningSequence = (userId: UserId, sequence: IndexedBoardGrid) =>
  createAction(REGISTER_WINNING_SEQUENCE, { sequence, userId });
export type registerWinningSequence = ReturnType<typeof registerWinningSequence>;

export const CHANGE_BOARD_DIMENSIONS = '[menu epic] Change Gameboard Dimensions';
export const changeBoardDimensions = (gridWidth: number, gridHeight: number) =>
  createAction(CHANGE_BOARD_DIMENSIONS, { gridWidth, gridHeight });
export type changeBoardDimensions = ReturnType<typeof changeBoardDimensions>;

export const APPLY_BOARD_DIMENSIONS = '[menu effect] Apply Gameboard Dimensions';
export const applyBoardDimensions = (gridWidth: number, gridHeight: number) =>
  createAction(APPLY_BOARD_DIMENSIONS, { gridWidth, gridHeight });
export type applyBoardDimensions = ReturnType<typeof applyBoardDimensions>;

export const SET_OPTIONS = '[board][options] Set Options'
export const setOptions = (options: Partial<State['board']['dimensions']>) =>
  createAction(SET_OPTIONS, options);
export type setOptions = ReturnType<typeof setOptions>;

export type Actions =
  | addUsersChecker
  | setOptions
  | flagIllegalMove
  | clearIllegalMove
  | makeAMove
  | changeCurrentPlayer
  | changeMatchState
  | declareWinner
  | registerWinningSequence
  | changeBoardDimensions
  | setOptions
  | applyBoardDimensions
