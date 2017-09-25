import React, { Component } from 'react';
import { connect } from 'react-redux';

import TicTacToe from './TicTacToe';
import ErrorPage from '../components/ErrorPage';
import LoadingScreen from '../components/LoadingScreen';
import Chat from './Chat';

import event from '../../../shared/event';

import styled from 'styled-components';

const mapStateToProps = (state) => ({
  connected: state.sockets.connected,
  socket: state.sockets.socket,
  gameId: state.game.id,
  player: state.game.player,
  field: state.game.field,
  pathname: state.routing.location.pathname,
  error: state.app.error,
});

const LinkContainer = styled.div`
  width: 100%;
  height: 200px;

  margin-top: 5em;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const UiContainer = styled.div`
  display: flex;
  margin-top: 4em;
  max-height: 360px;
  flex-direction: row;
  justify-content: space-around;
`;

const MiddleSizedLoader = styled(LoadingScreen)`
  width: 200px;
`;

class GameScreen extends Component {

  constructor(props) {
    super(props);
    if (this.connected) {
      const { socket, path } = this.props;
      this.joinRoom(socket, path);
    }
  }

  componentWillReceiveProps(nextProps) {
    /**
      Only make a join request if we changed path (joined another room)
      or swapped from disconnected to connected state
    **/
    if (this.props.pathname !== nextProps.pathname ||
       !this.props.connected && nextProps.connected) {
      const reg = /^\/(.+)$/;
      const id = nextProps.pathname.match(reg)[1];
      this.joinRoom(nextProps.socket, id);
    } 
  }

  joinRoom(socket, roomId) {
    socket.emit(event.GAME_CONNECT, roomId);
  }

  render() {
    return (
      <div>
      { 
        this.props.error ?  
          <ErrorPage><h1>{this.props.error}</h1></ErrorPage>

        : this.props.field ?
          <UiContainer>
            <TicTacToe />
            <Chat />
          </UiContainer>

        : this.props.player ?
          <LinkContainer>
            <h1>
              <a href={window.location.href} onClick={e => e.preventDefault}>
                Copy this link and send to your friend
              </a>
            </h1>
            <LoadingScreen rotating={true}/>
          </LinkContainer>

        : <MiddleSizedLoader rotating={true}/>
      }
      </div>
    );
  }
}

export default connect(mapStateToProps)(GameScreen);