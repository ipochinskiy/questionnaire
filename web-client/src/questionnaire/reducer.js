import { ActionTypes } from './actions';

const initialState = {
    questionList: [],
    isQuestionnaireSubmitted: false,
};

function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ActionTypes.APP_LOADED:
            return initialState;
        case ActionTypes.QUESTION_LIST_LOADED:
            const { questionList } = action.payload;
            return {
                ...state,
                questionList,
            };
        case ActionTypes.FETCH_FAILED:
            // TODO: let user know about the error
            return state;
        case ActionTypes.QUESTIONNAIRE_SUBMIT_SUCCEEDED:
            return {
                ...state,
                isQuestionnaireSubmitted: true,
            };
        default:
            return state;
    }
};

export default reducer;
