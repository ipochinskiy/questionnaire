import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import loadQuestionListSaga from './load-question-list.saga';
import appReducer from './reducer';

const logger = store => next => action => {
    const result = next(action);

    console.group(action.type);
    console.log('%c  [State Debug] action', 'color: #03A9F4; font-weight: bold', action);
    console.log('%c  [State Debug] state after', 'color: #4CAF50; font-weight: bold', store.getState());
    console.groupEnd();

    return result;
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    appReducer,
    applyMiddleware(logger, sagaMiddleware),
);

sagaMiddleware.run(loadQuestionListSaga);

export default store;
