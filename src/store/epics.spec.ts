import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/filter';
import {
  addUsersChecker,
  makeAMove,
  changeCurrentPlayer,
  declareWinner,
  registerWinningSequence,
  ADD_CHECKER
} from './actions';
import rootEpic from './epics';
import { DefaultState, MatchState } from './state';

// tslint:disable-next-line:no-any
let store: any;

beforeEach(() => {
  // tslint:disable-next-line:no-any
  store = {
    state: DefaultState,
    getState: () => store.state
  };
});

describe('Epics should work correctly, i.e.:', () => {
  describe('- Move epic...', () => {
    it('should do nothing if game hasnt started', () => {
      rootEpic(ActionsObservable.of(makeAMove(0)), store, {})
        .toArray()
        .subscribe(a => expect(a).toEqual([]));
    });
    it('should require to place checker', () => {
      const expected = [addUsersChecker(0, 0)];
      store.state.match.state = MatchState.InGame;
      rootEpic(ActionsObservable.of(makeAMove(0)), store, {})
        .toArray()
        .subscribe(a => expect(a).toEqual(expected));
    });
  });
  describe('- Change current player epic...', () => {
    beforeEach(() => {
      store.state.match.state = MatchState.InGame;
    });
    it('should change player after a move', () => {
      const expected = [changeCurrentPlayer(1)];
      rootEpic(ActionsObservable.of(addUsersChecker(0, 0)), store, {})
        .toArray()
        .subscribe(a => expect(a).toEqual(expected));
    });
  });
  describe('- Detect winner epic...', () => {
    beforeEach(() => {
      store.state.match.state = MatchState.InGame;
    });
    it('should detect winner', () => {
      let sequence: { index: number; value: number }[] = [];
      for (let i = 0; i < 4; i++) {
        store.state.board.grid[i] = 0;
        sequence[i] = {
          value: i,
          index: i
        };
      }
      const expected = [declareWinner(0), registerWinningSequence(0, sequence)];
      rootEpic(ActionsObservable.of(makeAMove(0)), store, {})
        .filter(a => a.type !== ADD_CHECKER)
        .subscribe(a => expect(a).toEqual(expected));
    });
  });
});
