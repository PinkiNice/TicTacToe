import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { gamePlayTurn }  from '../actions/gameActions';
import event from '../../../shared/event.js';

const darkGray = '#222222';
const lightGray = '#bcbcbc';

const appear = keyframes`
  from {
    opacity: 0.2;
    font-size: 4em;
  }

  to {
    opacity: 1;
    font-size: 2em;
  }
`;

const Cell = styled.div`
  width: 31%;
  height: 31%;
  margin: 1%;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  background-color: ${darkGray};
  color: ${lightGray};


  font-family: sans-serif;
  font-size: 2em;

  & h1 {
    animation: ${appear} 0.2s linear;
  }

  &:hover {
    background-color: ${lightGray};
    color: ${darkGray};
  }
`;

const FieldContainer = styled.div`
  width: 300px;
  height: 300px;

  position: relative;

  margin: auto;

  display: flex;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;
`;

const ResultContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  & h1 {
    text-align: center;
    font-size: 4em;
  }
  &:hover {
    &:before {
      content: "RESTART";
      color: black;
      font-weight: bold;
      font-size: 2em;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > h1 {
    margin-top: 0;
    text-align: center;
  }
`;

const resultColor = (winner, player) => {
  const lossColor = 'rgba(223, 106, 106, 0.7)';
  const winColor = 'rgba(194, 219, 193, 0.7)';
  const tieColor = 'rgba(76, 76, 76, 0.7)';

  if (winner === 'tie') {
    return tieColor;
  } else if (winner === player) {
    return winColor;
  } else {
    return lossColor;
  }
  
}

const resultAnnounce = (winner, player) => {
  const opponent = player === 'x' ? 'o' : 'x';

  if (winner === 'tie') {
    return 'friendly tie';
  } else if (winner === player) {
    return 'glorious victory';
  } else if (winner === opponent) {
    return 'honorable defeat';
  } else {
    return false;
  }
}

const mapStateToProps = (state) => ({
  ...state.game,
  socket: state.sockets.socket,
  resultColor: resultColor(state.game.winner, state.game.player),
  resultAnnounce: resultAnnounce(state.game.winner, state.game.player)
});

class TicTacToe extends Component {
  onCellClick(cellId) {
    if (!this.props.field[cellId] && this.props.turn === this.props.player) {
      this.props.socket.emit(event.PLAY_TURN, {
        roomId: this.props.id,
        cellId
      });
      this.props.dispatch(gamePlayTurn(cellId));
    }
  }
  
  restartGame() {
    this.props.socket.emit(event.GAME_RESTART, { roomId: this.props.id});
  }

  render() {
    return (
      <Container>
        <h1>
          {
            this.props.resultAnnounce ? `It's a ${this.props.resultAnnounce}` :
            this.props.turn === this.props.player ? 'Do' : 'Wait' 
          }
        </h1>
        <FieldContainer> 
          { this.props.field.map(
              (cell, id) => 
                <Cell onClick={() => this.onCellClick(id)} key={id}>
                  { cell ? <h1>{cell}</h1> : ''}
                </Cell>
            )
          }
          {
            this.props.winner ? 
              <ResultContainer 
                onClick={() => this.restartGame()}
                style={{
                  backgroundColor: this.props.resultColor
                  }} 
              >
              </ResultContainer> 
              : ''
          }
        </FieldContainer>
      </Container>
    );
  }
}
// <h1>{this.props.resultAnnounce}</h1>
export default connect(mapStateToProps)(TicTacToe);