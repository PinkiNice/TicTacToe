import types from './types';

export const socketConnect = (socket) => ({
  type: types.SOCKET_CONNECT,
  socket
});

export const socketSet = (socket) => ({
  type: types.SOCKET_SET,
  socket
});

export const socketSetManager = (manager) => ({
  type: types.SOCKET_SET_MANAGER,
  manager
});