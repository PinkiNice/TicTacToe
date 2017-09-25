import React, { Component } from 'react';
import { connect }          from 'react-redux';
import io                   from 'socket.io-client';
import styled               from 'styled-components';

import { socketConnect, socketSet }         from '../actions/socketActions';
import { gameConnected, gameUpdateState }   from '../actions/gameActions';
import { appError }                         from '../actions/appActions';
import { chatAddMessage, chatSetState }     from '../actions/chatActions';

import LoadingScreen from '../components/LoadingScreen';
import event from '../../../shared/event';

const Wrapper = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  bottom: 0%;
  background-color: #dedede;
`;

const StatusContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const mapStateToProps = (state) => ({
  connected: state.sockets.connected,
  socket: state.sockets.socket,
  player: state.game.player
});

class SocketManager extends Component {
  constructor(props) {
    super(props);
    this.makeNewSocketConnection();
  }

  makeNewSocketConnection() {    
    const socket = io();
    this.props.dispatch(socketSet(socket));
    this.setHooks(socket);
  }

  componentDidUpdate(prevProps, prevState) {
    // If socket which we are using had changed
    if (prevProps.socket !== this.props.socket) {
      // Be sure to disconnect old socket from server
      prevProps.socket ? prevProps.socket.disconnect() : null;

      // And to make new connection
      // If there is none
      if (!this.props.socket) {
        this.makeNewSocketConnection();
      }

    }
  }

  setHooks(socket) {
    const { dispatch } = this.props;

    socket.on('connect', () => {
      dispatch(socketConnect(socket));
    });

    socket.on('disconnect', () => {
      /**
        Raise error only if we are still using
        the socket that was disconnected.
        ( which means we actually lost connection )
        Otherwise we just doesn't care about it.
      **/
      if (this.props.socket === socket) {
        dispatch(appError('You have been disconnected.'));
      }
    });

    socket.on(event.GAME_CREATED, (id) => {
      socket.emit(event.GAME_CONNECT, id);
    });

    socket.on(event.GAME_UPDATE, (game) => {
      dispatch(gameUpdateState(game));
    });

    socket.on(event.GAME_CONNECTED, ({ id, player }) => {
      dispatch(gameConnected(id, player));
    });

    socket.on(event.ERROR, (message) => {
      dispatch(appError(message));
    });

    socket.on(event.CHAT_UPDATE, (message) => {
      // Do not include messages sent by ours
      // Because they were added on client side
      if (message.sender !== this.props.player)
        dispatch(chatAddMessage(message));
    });

    socket.on(event.CHAT_STATE, (messages) => {
      dispatch(chatSetState(messages));
    });
  }

  render() {
    return (
        <div>
        {
          <Wrapper>
              <h1>WebSocket by Socket.io</h1>
              <StatusContainer>
                <h1>{this.props.connected ? 'connected' : 'connecting...'}</h1>
                <LoadingScreen rotating={!this.props.connected}/>
              </StatusContainer>
          </Wrapper>
        }
        </div>
    );  
  }
}

export default connect(mapStateToProps)(SocketManager);