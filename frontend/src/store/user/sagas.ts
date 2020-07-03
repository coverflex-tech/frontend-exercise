import { call, takeLatest, put } from 'redux-saga/effects';
import loadUsersDetails from 'services/api/user/loadUserDetails';
import { FetchUserDetailsSuccessful, FetchUserDetails, FetchUserDetailsFailed } from './actionTypes';

function* fetchUserDetails(action: Action<FetchUserDetailsPayload>){
    const { payload: { userName } } = action;
    try {
        const userDetails = (yield call(loadUsersDetails, { userName })).data;
        const { user: {
            user_id: userId,
            data: {
                balance,
                product_ids: productIds,
            }
        } } = userDetails
        yield put(FetchUserDetailsSuccessful({
            userId,
            balance,
            productIds,
        }));
    } catch (e) {
        yield put(FetchUserDetailsFailed());
    }
    
}

export default function* userSaga() {
    yield takeLatest(FetchUserDetails.type, fetchUserDetails);
}