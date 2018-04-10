import { DefaultState } from '../state';
import { rootReducer } from '.';
import { addUsersChecker } from '../actions';

const state = DefaultState;

describe('Reducer testing', () => {
  it('should add checker', () => {
    const newState = rootReducer(state, addUsersChecker(0, 0));
    expect(newState.board.grid[0]).toBe(0);
  });
});
