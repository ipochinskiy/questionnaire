import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes, fetchFailed, questionListLoaded } from './actions';

export function* fetchQuestionList(action) {
    try {
        const questionList = yield call(loadQuestionList);
        yield put(questionListLoaded(questionList));
    } catch (e) {
        yield put(fetchFailed());
    }
}

function loadQuestionList() {
    return fetch('/questionnaire.json')
        .then(response => response.json());
}

function* loadQuestionListSaga() {
    yield takeLatest(ActionTypes.APP_LOADED, fetchQuestionList);
}

export default loadQuestionListSaga;