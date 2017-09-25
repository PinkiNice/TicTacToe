import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sockets from './sockets';
import game from './game';
import app from './app';
import chat from './chat';

const rootReducer = combineReducers({
  sockets,
  game,
  app,
  chat,
  routing: routerReducer
});

export default rootReducer;