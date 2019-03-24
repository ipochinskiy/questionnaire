import { put } from 'redux-saga/effects';
import { questionnaireSubmitSucceeded } from './actions';
import { sendQuestionnaire } from './questionnaire-submitted.saga';

describe('Saga: sendQuestionnaireSaga', () => {
    describe('with a successful fetch', () => {
        it('should dispatch action', () => {
            const generator = sendQuestionnaire({
                payload: {
                    questionnaire: {
                        'first question': '42',
                    },
                }
            });

            let next = generator.next();
            next = generator.next({ success: true });

            expect(next).toMatchObject({
                done: false,
                value: put(questionnaireSubmitSucceeded()),
            });
        });
    });

    describe('with a failed fetch', () => {
        // TODO: find a way to test this case
    });
});
