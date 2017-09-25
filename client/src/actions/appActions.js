import types from './types';

export const appReset = () => ({
  type: types.RESET
});

export const appError = (error) => ({
  type: types.APP_ERROR,
  error
});

export const appClearError = () => ({
  type: types.APP_CLEAR_ERROR
});
