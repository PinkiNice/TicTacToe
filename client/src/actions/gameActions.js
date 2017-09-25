import types from './types';

export const setPlayer = (player) => ({
  type: types.SET_PLAYER,
  player
});

export const newGameCreated = (id) => ({
  type: types.NEW_GAME_CREATED,
  id
});

export const gameUpdateState = (newState) => ({
  type: types.GAME_UPDATE_STATE,
  state: newState
});

export const gameConnected = (id, player) => ({
  type: types.GAME_CONNECTED,
  id,
  player
});

export const gamePlayTurn = (cellId) => ({
  type: types.GAME_PLAY_TURN,
  cellId
});