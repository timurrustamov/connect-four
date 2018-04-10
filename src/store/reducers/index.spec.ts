import { DefaultState, MatchState, Theme } from '../state';
import { rootReducer } from '.';
import {
  addUsersChecker,
  applyBoardDimensions,
  changeCurrentPlayer,
  changeMatchState,
  declareWinner,
  setOptions,
  changeTheme
} from '../actions';

const state = DefaultState;

describe('Reducer testing', () => {
  it('should add checker', () => {
    const newState = rootReducer(state, addUsersChecker(0, 0));
    expect(newState.board.grid[0]).toBe(0);
    expect(newState !== state).toBe(true);
  });
  it('should apply board dimensions', () => {
    const newState = rootReducer(state, applyBoardDimensions(10, 10));
    expect(newState.board.dimensions).toMatchObject({
      gridWidth: 10,
      gridHeight: 10
    });
    expect(newState.board.grid).toHaveLength(100);
    expect(newState !== state).toBe(true);
  });
  it('should change current player', () => {
    const newState = rootReducer(state, changeCurrentPlayer(1));
    expect(newState.currentPlayer).toBe(1);
    expect(newState !== state).toBe(true);
  });
  it('should change match state', () => {
    const newState = rootReducer(state, changeMatchState(MatchState.Results));
    expect(newState.match.state).toBe(MatchState.Results);
    expect(newState !== state).toBe(true);
  });
  it('should declare a winner', () => {
    const newState = rootReducer(state, declareWinner(1));
    expect(newState.match.winner).toBe(1);
    expect(newState !== state).toBe(true);
  });
  it('should set options', () => {
    const newState = rootReducer(state, setOptions({ players: 4 }));
    expect(newState.options).toMatchObject({ players: 4 });
    expect(newState !== state).toBe(true);
  });
  it('should change theme', () => {
    const theme: Theme = {
      boardBackgroundColor: '',
      boardBackgroundShadowColor: '',
      boardHolesColor: '',
      boardHolesOnHoverColor: '',
      boardHolesShadowColor: '',
      id: 0,
      playerColors: []
    };
    const newState = rootReducer(state, changeTheme(theme));
    expect(newState.theme).toMatchObject(theme);
    expect(newState !== state).toBe(true);
  });
});
