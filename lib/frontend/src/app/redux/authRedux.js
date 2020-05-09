import mirrorCreator from 'mirror-creator';

const types = mirrorCreator([
  'SIGN_IN_REQUEST',
  'SIGN_IN_SUCCESS',
  'SIGN_IN_FAILURE',
]);

export function signInRequest(username) {
  return {
    type: types.SIGN_IN_REQUEST,
    username,
  }
}

export function signInSuccess(user) {
  return {
    type: types.SIGN_IN_SUCCESS,
    user
  };
}

export function signInFail(error) {
  return {
    type: types.SIGN_IN_FAILURE,
    error
  };
}

const initialState = {
  user: {},
  error: '',
};

const authRedux = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN_SUCCESS: {

      return {
        ...state,
        user: action.user,
        error: '',
      };
    }
    case types.SIGN_IN_FAILURE: {
      return {
        ...state,
        error: 'There was an error!',
      };
    }
    default: {
      return state;
    }
  }
};

export const authTypes = types;
export default authRedux;
