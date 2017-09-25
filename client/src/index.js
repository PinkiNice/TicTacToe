import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import history from './history';

import store from './store';
import RoomCreator from './containers/RoomCreator';
import GameScreen from './containers/GameScreen';
import SocketManager from './containers/SocketManager';

import "../styles/index.css";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={ RoomCreator } />
            <Route path="/:id" component={ GameScreen } />
          </div>
      </ConnectedRouter>
      <SocketManager />
    </div>
  </Provider>,
  document.getElementById("root") // eslint-disable-line no-undef
);
