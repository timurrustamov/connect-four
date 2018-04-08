import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers';
import { DefaultState } from './state';
import { createEpicMiddleware } from 'redux-observable';
import { RootEpic } from './epics';

const composeEnhancers = window && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const epicMiddleware = createEpicMiddleware(RootEpic);

export default createStore(rootReducer, DefaultState, composeEnhancers(applyMiddleware(
  epicMiddleware
)));