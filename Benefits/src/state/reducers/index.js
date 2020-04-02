import { combineReducers } from 'redux';

import { SIGN_OUT } from '../actions/signin';

import signin from './signin';

const appReducer = combineReducers({
    signin,
});

const rootReducer = (state, action) => {
    // Reset store when logging out
    if (action.type === SIGN_OUT) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
