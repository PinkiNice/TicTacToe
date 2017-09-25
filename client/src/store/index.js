
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';
import history from '../history';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history)))
);

export default store;
