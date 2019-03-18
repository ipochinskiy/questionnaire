import { appLoaded, questionListLoaded } from './actions';
import reducer from './reducer';

describe('Reducer', () => {
    describe('without an initial state and an action', () => {
        it('should return initial state', () => {
            const initialState = undefined;

            const state = reducer(initialState, undefined);

            expect(state).toMatchObject(
                createState()
            );
        });
    });

    describe('with action of type "APP_LOADED"', () => {
        it('should return initial state', () => {
            const initialState = createState({
                questionList: [
                    { id: 'first question' },
                    { id: 'second one' },
                ],
            });

            const state = reducer(initialState, appLoaded());

            expect(state).toMatchObject({
                questionList: [],
            });
        });
    });

    describe('with action of type "QUESTION_LIST_LOADED"', () => {
        it('should return initial state', () => {
            const initialState = undefined;
            const questionList = [
                { id: 'first question' },
                { id: 'second one' },
            ];

            const state = reducer(initialState, questionListLoaded(questionList));

            expect(state).toMatchObject({
                questionList,
            });
        });
    });
});

function createState(options) {
    return {
        questionList: [],
        ...options,
    };
}
