export const ActionTypes = {
    APP_LOADED:                         '[App] App Loaded',
    QUESTIONNAIRE_SUBMITTED:            '[App] Questionnaire Submitted',
    QUESTIONNAIRE_SUBMIT_SUCCEEDED:     '[App] Questionnaire Submit Succeeded',
    QUESTION_LIST_LOADED:               '[App] Question List Loaded',
    FETCH_FAILED:                       '[App] Fetch failed',
};

export function appLoaded() {
    return {
        type: ActionTypes.APP_LOADED,
    };
}

export function questionnaireSubmitted(questionnaire) {
    return {
        type: ActionTypes.QUESTIONNAIRE_SUBMITTED,
        payload: { questionnaire },
    };
}

export function questionnaireSubmitSucceeded() {
    return {
        type: ActionTypes.QUESTIONNAIRE_SUBMIT_SUCCEEDED,
    };
}

export function questionListLoaded(questionList) {
    return {
        type: ActionTypes.QUESTION_LIST_LOADED,
        payload: { questionList },
    };
}

export function fetchFailed() {
    return {
        type: ActionTypes.FETCH_FAILED,
    };
}
