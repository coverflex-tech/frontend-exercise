import {
  SIGN_IN_CLEAR_DATA,
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
} from '../../actions/signin';

export const initialState = {
  data   : null,
  error  : null,
  loading: false,
};

function signin(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_CLEAR_DATA:
      return initialState;

    case SIGN_IN_FAIL:
      return {
          data   : null,
          error  : action.payload,
          loading: false,
      };

    case SIGN_IN_REQUEST:
      return {
          ...state,
          loading: true,
      };

    case SIGN_IN_SUCCESS:
      return {
          data   : action.payload,
          error  : null,
          loading: false,
      };

  default:
      return state;
  }
}

export default signin;
