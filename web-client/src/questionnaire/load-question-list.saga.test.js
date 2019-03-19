import { put } from 'redux-saga/effects';
import { questionListLoaded } from './actions';
import { fetchQuestionList } from './load-question-list.saga';

describe('Saga: loadQuestionListSaga', () => {
    describe('with a successful fetch', () => {
        it('should load the question list', () => {
            const generator = fetchQuestionList();
            const expectedQuestionList = generateQuestionList();

            let next = generator.next();
            next = generator.next(expectedQuestionList);

            expect(next).toMatchObject({
                done: false,
                value: put(questionListLoaded(expectedQuestionList)),
            });
        });
    });

    describe('with a failed fetch', () => {
        // TODO: find a way to test this case
    });
});

function generateQuestionList(...options) {
    return [
        { id: 'first-question' },
        { id: 'second-one' },
        ...options,
    ];
}
