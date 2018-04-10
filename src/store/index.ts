import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import persistState from 'redux-localstorage';
import { createEpicMiddleware } from 'redux-observable';
import { RootEpic } from './epics';
import rootReducer from './reducers';
import { DefaultState } from './state';

const composeEnhancers = composeWithDevTools;
const epicMiddleware = createEpicMiddleware(RootEpic);

export default createStore(
  rootReducer,
  DefaultState,
  composeEnhancers(
    applyMiddleware(epicMiddleware),
    // tslint:disable-next-line:no-any
    (persistState && persistState()) || ((a: any) => a)
  )
);
