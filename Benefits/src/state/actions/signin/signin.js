import createAction from '../../../network/create-action';
import { getApiURL } from '../../../network/config';

export const SIGN_IN_CLEAR_DATA = 'SIGN_IN_CLEAR_DATA';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';

export const clearData = () => ({ type: SIGN_IN_CLEAR_DATA, payload: null });
export const signout = () => ({ type: SIGN_OUT, payload: null });

export const signin = userId => createAction({
  meta: null,
  request: {
    url: getApiURL(`users/${userId}`)
  },
  types: [
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL
  ]
});
