export const ActionTypes = {
    APP_LOADED:                '[App] App Loaded',
    QUESTION_LIST_LOADED:      '[App] Question List Loaded',
    FETCH_FAILED:              '[App] Fetch failed',
};

export function appLoaded() {
    return {
        type: ActionTypes.APP_LOADED,
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
