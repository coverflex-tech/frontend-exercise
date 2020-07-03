import { actionCreator, genericActionCreator } from "store/utils/actionCreator";

export const FetchUserDetailsSuccessful = actionCreator<FetchUserDetailsSuccessfulPayload>("@@FETCH_USER_DETAILS_SUCCESSFUL");
export const FetchUserDetailsFailed = genericActionCreator("@@FETCH_USER_DETAILS_FAILED");
export const FetchUserDetails = actionCreator<FetchUserDetailsPayload>("@@FETCH_USER_DETAILS");
export const Logout = genericActionCreator("@@LOGOUT_USER");
