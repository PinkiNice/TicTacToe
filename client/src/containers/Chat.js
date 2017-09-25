import React, { Component } from 'react';
import { connect } from 'react-redux';

import { chatInput, chatSendMessage } from '../actions/chatActions';

import event from '../../../shared/event';

import styled from 'styled-components';

const darkGray = '#222222';
const lightGray = '#bcbcbc';

const Message = ({ sender, text }, id) => {
  return (
    <p key={id}>{sender}: {text}</p>
  );
}

const ChatContainer = styled.div`
  height: 100%;
  width: 300px;
  align-self: flex-end;
  font-family: sans-serif;
  font-size: 1.2em;
  border: 1px solid ${lightGray};
  & > input {
    height: 30px;
    width: 100%;
    border: none;
    background-color: #dedede;
    font-size: 1em;
  }
`;

const MessageContainer = styled.div`
  height: 300px;
  flex-grow: 0;
  overflow-y: scroll;
  & p {
    background-color: ${lightGray};
    color: ${darkGray};
    &:nth-child(2n) {
      background-color: ${darkGray};
      color: ${lightGray};
    }
    margin: 0;
    padding: 0.1em;
  }
`;


const mapStateToProps = (state) => ({
  inputValue: state.chat.inputValue,
  messages: state.chat.messages,
  player: state.game.player,
  socket: state.sockets.socket,
  roomId: state.game.id,
});

class Chat extends Component {

  sendMessage(e) {
    if (e.charCode === 13 && this.props.inputValue) {
      e.preventDefault();

      const message = {
        sender: this.props.player,
        text: this.props.inputValue
      };

      this.props.dispatch(chatSendMessage(message));
      this.props.socket.emit(event.CHAT_NEW_MESSAGE, { roomId: this.props.roomId, message });
    }
  }

  onInput(e) {
    const newValue = e.target.value;
    this.props.dispatch(chatInput(newValue))
  }

  render() {

    return (
      <ChatContainer>
        <MessageContainer>
          {
            this.props.messages.map((message, id) => Message(message, id))
          }
        </MessageContainer>
        <input 
          value={this.props.inputValue}
          onInput={(e) => this.onInput(e)}
          onKeyPress={(e) => this.sendMessage(e)}
          type="text" 
          placeholder="write a message..."
        />
      </ChatContainer>);

  }
}

export default connect(mapStateToProps)(Chat);
