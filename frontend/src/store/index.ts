import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension';
import _ from 'lodash';
import { saveState, loadState } from 'utils/persistStore';

const sagaMiddleware = createSagaMiddleware();

const initialState = loadState();

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)));

store.subscribe(_.throttle(() => {
    saveState(store.getState());
}, 1000)); //Save state every 1sec

sagaMiddleware.run(rootSaga);

export default store;
