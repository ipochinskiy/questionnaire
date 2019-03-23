import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes, fetchFailed, questionnaireSubmitSucceeded } from './actions';

export function* sendQuestionnaire(action) {
    if (!action || !action.payload || !action.payload.questionnaire) {
        return;
    }

    try {
        yield call(sendAnswers, action.payload.questionnaire);
        yield put(questionnaireSubmitSucceeded());
    } catch (e) {
        yield put(fetchFailed());
    }
}

function sendAnswers(answers) {
    return fetch('http://localhost:5000/api/answers', {
        method: 'POST',
        body: JSON.stringify(answers),
    })
        .then(response => response.json());
}

function* sendQuestionnaireSaga() {
    yield takeLatest(ActionTypes.QUESTIONNAIRE_SUBMITTED, sendQuestionnaire);
}

export default sendQuestionnaireSaga;
