import { IndexedBoardGrid, MatchState, State, Theme, UserId } from '../state';
import createAction from './create-action';

export const MAKE_A_MOVE = '[game/users epic] Make A Move';
/**
 * This action conditionally triggers the effect ADD_CHECKER in an EPIC
 * @param columnId a column to place the checker for current player
 */
export const makeAMove = (columnId: number) =>
  createAction(MAKE_A_MOVE, { columnId });
export type makeAMove = ReturnType<typeof makeAMove>;

export const ADD_CHECKER = '[game effect] Add Checker';
/**
 * This actually places a checker in a column for a given userId
 * @param userId
 * @param columnId
 */
export const addUsersChecker = (userId: UserId, columnId: number) =>
  createAction(ADD_CHECKER, { userId, columnId });
export type addUsersChecker = ReturnType<typeof addUsersChecker>;

export const FLAG_ILLEGAL_MOVE = '[game effect] Flag Illegal Move';
/**
 * @deprecated Flags a placement as invalid
 * @param userId
 * @param columnId
 */
export const flagIllegalMove = (userId: UserId, columnId: number) =>
  createAction(FLAG_ILLEGAL_MOVE, { userId, columnId });
export type flagIllegalMove = ReturnType<typeof flagIllegalMove>;

export const CLEAR_ILLEGAL_MOVE = '[game effect] Clear Illegal Move Flag';
/**
 * @deprecated Clears flags for incorrect placements
 */
export const clearIllegalMove = () => createAction(CLEAR_ILLEGAL_MOVE);
export type clearIllegalMove = ReturnType<typeof clearIllegalMove>;

export const CHANGE_CURRENT_PLAYER = '[users effect] Change Current User';
/**
 * Changes the current player
 * @param userId new players ID
 */
export const changeCurrentPlayer = (userId: UserId) =>
  createAction(CHANGE_CURRENT_PLAYER, { userId });
export type changeCurrentPlayer = ReturnType<typeof changeCurrentPlayer>;

export const CHANGE_MATCH_STATE = '[game effect] Change Game State';
/**
 * Controls the match (and actually the whole application) state
 * @param matchState new MatchState (enum)
 */
export const changeMatchState = (matchState: MatchState) =>
  createAction(CHANGE_MATCH_STATE, { matchState });
export type changeMatchState = ReturnType<typeof changeMatchState>;

export const DECLARE_WINNER = '[game effect] Declare Winner';
/**
 * Declares a winner and closes the match in an EPIC
 * @param userId The winner player ID
 */
export const declareWinner = (userId: UserId) =>
  createAction(DECLARE_WINNER, { userId });
export type declareWinner = ReturnType<typeof declareWinner>;

export const REGISTER_WINNING_SEQUENCE = '[game effect] Winning Sequence';
/**
 * Registeres a victory sequence for better display (and so much fame)
 * @param userId player who has won
 * @param sequence Array of indexed cells that registeres as victory
 */
export const registerWinningSequence = (
  userId: UserId,
  sequence: IndexedBoardGrid
) => createAction(REGISTER_WINNING_SEQUENCE, { sequence, userId });
export type registerWinningSequence = ReturnType<
  typeof registerWinningSequence
>;

export const CHANGE_BOARD_DIMENSIONS =
  '[menu epic] Change Gameboard Dimensions';
/**
 * Conditionally assigns new grid dimensions in an EPIc
 * @param gridWidth new game board grid width
 * @param gridHeight new game board grid height
 */
export const changeBoardDimensions = (gridWidth: number, gridHeight: number) =>
  createAction(CHANGE_BOARD_DIMENSIONS, { gridWidth, gridHeight });
export type changeBoardDimensions = ReturnType<typeof changeBoardDimensions>;

export const APPLY_BOARD_DIMENSIONS =
  '[menu effect] Apply Gameboard Dimensions';
/**
 * Actually assigns the new grid dimensions and clears the game board
 * @param gridWidth new game board grid width
 * @param gridHeight new game board grid height
 */
export const applyBoardDimensions = (gridWidth: number, gridHeight: number) =>
  createAction(APPLY_BOARD_DIMENSIONS, { gridWidth, gridHeight });
export type applyBoardDimensions = ReturnType<typeof applyBoardDimensions>;

export const SET_OPTIONS = '[board][options] Set Options';
/**
 * Sets options (actually only used for player count)
 */
export const setOptions = (options: Partial<State['options']>) =>
  createAction(SET_OPTIONS, options);
export type setOptions = ReturnType<typeof setOptions>;

export const CHANGE_THEME = '[menu][board] Change Theme';
/**
 * Changes the current theme (don't forget to add an ID!)
 */
export const changeTheme = (theme: Theme) => createAction(CHANGE_THEME, theme);
export type changeTheme = ReturnType<typeof changeTheme>;

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
  | changeTheme;
