/**
  Managing APP state
**/

import types from '../actions/types';

const initialAppState = {
  error: false
};

export default function app (state = initialAppState, action) {
  switch (action.type) {
    case types.RESET:
      return initialAppState;
      
    case types.APP_ERROR:
      return {
        ...state,
        error: action.error
      };
    case types.APP_CLEAR_ERROR:
      return {
        ...state,
        error: false
      };
    default:
      return state;
  }
}