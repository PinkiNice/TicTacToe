import types from '../actions/types';

const initialSocketsState = {
  connected: false,
  socket: null
};

export default function sockets (state = initialSocketsState, action) {
  switch (action.type) {

    case types.APP_CLEAR_ERROR:
      return initialSocketsState;

    case types.SOCKET_CONNECT:
      return {
        ...state,
        connected: action.socket.connected
      }

    case types.SOCKET_SET:
      return {
        ...state,
        socket: action.socket
      }

    default:
      return state;
  }
};