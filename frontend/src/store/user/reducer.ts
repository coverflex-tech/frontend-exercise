import { isType } from "store/utils/actionCreator";
import { FetchUserDetails, FetchUserDetailsSuccessful, FetchUserDetailsFailed, Logout } from "./actionTypes";
import { INITIAL_STATE } from "store/constants";

const { user: defaultState } = INITIAL_STATE; 

const userReducer = (state: UserState = defaultState, action: ActionBase): UserState => {

    if(isType(action, FetchUserDetails)) {
        return {
            ...state,
            fetching: true,
        }
    }

    if(isType(action, FetchUserDetailsSuccessful)) {
        const { userId, balance, productIds } = action.payload;
        return {
            ...state,
            fetching: false,
            userId,
            balance,
            productIds,
        };
    }
    
    if(isType(action, FetchUserDetailsFailed)) {
        return {
            ...defaultState,
            error: true,
            fetching: false,
        }
    }
    if(isType(action, FetchUserDetailsFailed)) {
        return {
            ...defaultState,
            error: true,
        }
    }

    if(isType(action, Logout)) {
        return {
            ...defaultState,
        };
    }

    return state;
}

export default userReducer;
