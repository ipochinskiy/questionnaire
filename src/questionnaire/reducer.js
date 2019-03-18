import { ActionTypes } from './actions';

const initialState = {
    questionList: [],
};

function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ActionTypes.APP_LOADED:
            return {
                ...state,
                questionList: [],
            };
        case ActionTypes.QUESTION_LIST_LOADED:
            const { questionList } = action.payload;
            return {
                ...state,
                questionList,
            };
        case ActionTypes.FETCH_FAILED:
            // TODO: let user know about the error
        default:
            return state;
    }
};

export default reducer;
