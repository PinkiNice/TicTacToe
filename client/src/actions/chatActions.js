import types from './types';

export const chatInput = (newValue) => ({
  type: types.CHAT_INPUT,
  newValue
});

export const chatSendMessage = (message) => ({
  type: types.CHAT_SEND_MESSAGE,
  message
});

export const chatAddMessage = (message) => ({
  type: types.CHAT_ADD_MESSAGE,
  message
});

export const chatSetState = (messages) => ({
  type: types.CHAT_SET_STATE,
  messages
});