import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import LoadingScreen from '../components/LoadingScreen';

import event from '../../../shared/event';

const LoadingContainer = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4em;
`;

const mapStateToProps = (state) => ({
  connected: state.sockets.connected,
  socket: state.sockets.socket,
  gameId: state.game.id
});

class RoomCreator extends Component {

  constructor(props) {
    super(props);
    if (this.props.connected) {
      this.props.socket.emit(event.GAME_CREATE);
    }
  }

  componentWillReceiveProps(nextProps) {
    // On connecting after being disconnected
    if (!this.props.connected && nextProps.connected) {
      const { socket } = nextProps;
      socket.emit(event.GAME_CREATE);
    } 

    if (nextProps.gameId) {
      this.props.dispatch(push(`/${nextProps.gameId}`))
    }
  }

  render() {
    return (
      <LoadingContainer>
        <LoadingScreen rotating={true}/>
      </LoadingContainer>
    );
  }
}

export default connect(mapStateToProps)(RoomCreator);
