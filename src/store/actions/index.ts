import createAction from './create-action'
import { UserId, State, MatchState } from '../state';

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

export const CHANGE_CURRENT_USER = '[users effect] Change Current User'
export const changeCurrentUser = (userId: UserId) =>
  createAction(CHANGE_CURRENT_USER, { userId });
export type changeCurrentUser = ReturnType<typeof changeCurrentUser>;

export const CHANGE_MATCH_STATE = '[game effect] Change Game State';
export const changeMatchState = (matchState: MatchState) =>
  createAction(CHANGE_MATCH_STATE, { matchState });
export type changeMatchState = ReturnType<typeof changeMatchState>;

export const DECLARE_WINNER = '[game effect] Declare Winner';
export const declareWinner = (userId: UserId) =>
  createAction(DECLARE_WINNER, { userId });
export type declareWinner = ReturnType<typeof declareWinner>;

export const REGISTER_WINNING_SEQUENCE = '[game effect] Winning Sequence';
export const registerWinningSequence = (sequence: number[]) =>
  createAction(REGISTER_WINNING_SEQUENCE, { sequence });
export type registerWinningSequence = ReturnType<typeof registerWinningSequence>;

// export const isMoveAllowed = (userId: UserId, columnId: number): AsyncAction => (
//   async (dispatch, getState) => {
//     const { grid, options } = getState().board;
//     const column = grid.filter((_, index) => index % options.boardWidth === columnId)
//     if (column.every(cell => typeof cell !== 'undefined')) {
//       dispatch(flagIllegalMove(userId, columnId));
//       return false;
//     }
//     const { illegalMoves } = getState();
//     if (illegalMoves.length > 0) {
//       dispatch(clearIllegalMove);
//     }
//     return true;
//   }
// );

// export const makeAMove = (userId: UserId, columnId: number): AsyncAction => (
//   async (dispatch) => {
//     try {
//       if (await dispatch(isMoveAllowed(userId, columnId))) {
//         dispatch(addUsersChecker(userId, columnId));
//       }
//     } catch (e) {
//       console.warn(e);
//     }
//   }
// );

export const SET_OPTIONS = '[board][options] Set Options'
export const setOptions = (options: Partial<State['board']['options']>) =>
  createAction(SET_OPTIONS, options);
export type setOptions = ReturnType<typeof setOptions>;

export type Actions =
  | addUsersChecker
  | setOptions
  | flagIllegalMove
  | clearIllegalMove
  | makeAMove
  | changeCurrentUser
  | changeMatchState
  | declareWinner
  | registerWinningSequence
