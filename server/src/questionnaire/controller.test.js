const {
    assertThat,
    hasProperty,
    is,
    contains,
    hasProperties,
    func,
    string,
} = require('hamjest');
const { stub } = require('sinon');

const initializeController = require('./controller');

describe('Questionnaire: Controller', () => {
    let controller;
    let repository;

    beforeEach(() => {
        repository = {
            getQuestionList: stub().resolves(),
            saveAnswers: stub().resolves(),
        };
        controller = initializeController({ repository });
    });

    it('should return an object with "routes"', () => {

        assertThat(controller, hasProperty('routes', contains(
            hasProperties({
                method: is('get'),
                path: is('/api/questions'),
                handler: func(),
            }),
            hasProperties({
                method: is('post'),
                path: is('/api/answers'),
                handler: func(),
            }),
        )));
    });

    describe('GET "/api/questions"', () => {
        let handler;

        beforeEach(() => {
            handler = controller.routes[0].handler;
            repository.getQuestionList.resolves([ 1, 2, 3 ]);
        });

        it('should call "getQuestionList" on the repository', async () => {

            await handler();

            assertThat(repository.getQuestionList.callCount, is(1));
        });

        it('should return data from the repository', async () => {

            const result = await handler();

            assertThat(result, contains(1, 2, 3));
        });
    });

    describe('POST "/api/answers"', () => {
        let handler;
        let formData;

        beforeEach(() => {
            handler = controller.routes[1].handler;
            formData = {
                'first question': '42',
                'second one': '0815',
            };
            repository.saveAnswers.resolves({ saved: true });
        });

        it('should call "saveAnswers" on the repository', async () => {

            await handler({
                body: JSON.stringify(formData),
            });

            assertThat(repository.saveAnswers, hasProperties({
                callCount: is(1),
                args: contains(
                    contains(formData),
                ),
            }));
        });

        it('should return dummy data', async () => {

            const result = await handler({
                body: JSON.stringify(formData),
            });

            assertThat(result, is({ success: true }));
        });
    });
});
