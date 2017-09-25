/**
  Managing chat state
**/

import types from '../actions/types';

const initialAppState = {
 messages: [
    { sender: 'x', text: 'Hello' },
    { sender: 'o', text: 'Nice to meet you!'},
    { sender: 'o', text: 'How are you?'}
  ],
  inputValue: ''
};

const addMessage = (messages, message) => {
  const newMessages = messages.slice(0);
  newMessages.push(message);
  return newMessages;
}
export default function app (state = initialAppState, action) {
  switch (action.type) {
    case types.RESET:
      return initialAppState;
      
    case types.CHAT_SET_STATE:
      return {
        ...state,
        messages: action.messages
      };

    case types.CHAT_INPUT: 
      return {
        ...state,
        inputValue: action.newValue
      };

    case types.CHAT_SEND_MESSAGE:
      return {
        ...state,
        messages: addMessage(state.messages, action.message),
        inputValue: '',
      };

    case types.CHAT_ADD_MESSAGE:
      return {
        ...state,
        messages: addMessage(state.messages, action.message),
      };

    default:
      return state;
  }
}