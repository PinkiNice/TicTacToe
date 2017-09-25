/**
Whole game state and manipulations with it
**/

import types from '../actions/types';

const initialGameState = {
  id: null
};

export default function sockets (state = initialGameState, action) {
  switch (action.type) {

    case types.APP_CLEAR_ERROR:
      return initialGameState;

    case types.START_GAME:
      return {
        ...state,
        running: true
      };

    case types.NEW_GAME_CREATED: 
      return {
        ...state,
        id: action.id
      };

    case types.GAME_UPDATE_STATE:
      return {
        ...state,
        ...action.state
      };

    case types.GAME_PLAY_TURN:
      console.log('Playing turn');
      return {
        ...state,
        turn: state.player === 'x' ? 'o' : 'x', 
        field: state.field.map((token, cellId) => cellId === action.cellId ? state.player : token)
      };

    case types.SET_PLAYER:
      return {
        ...state,
        player: action.player
      };

    case types.GAME_CONNECTED:
      return {
        ...state,
        player: action.player,
        id: action.id
      };

    default:
      return state;
  }
};