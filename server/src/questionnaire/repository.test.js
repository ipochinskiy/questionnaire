const {
    assertThat,
    hasProperty,
    is,
    contains,
    hasProperties,
    func,
    containsString,
} = require('hamjest');
const { stub } = require('sinon');

const initializeRepository = require('./repository');

describe('Questionnaire: Repository', () => {
    let questionCollection;
    let repository, initialData, logger;

    describe('while initializing the repository', () => {
        describe('when initialized without initial data', () => {
            beforeEach(() => {
                questionCollection = {
                    createIndex: stub().resolves(),
                    insertMany: stub().resolves(),
                    find: stub().resolves(),
                };
                initialData = undefined;
                logger = {
                    warn: stub(),
                };
            });

            it('should log nothing', async () => {

                repository = await initializeRepository({ questionCollection, initialData, logger });

                assertThat(logger.warn, hasProperties({
                    callCount: is(0),
                }));
            });

            it('should return a repository object', async () => {

                repository = await initializeRepository({ questionCollection, initialData, logger });

                assertThat(repository, hasProperties({
                    getQuestionList: func(),
                    saveAnswers: func(),
                }));
            });
        });

        describe('when initialized with initial data', () => {
            beforeEach(() => {
                questionCollection = {
                    createIndex: stub().resolves(),
                    insertMany: stub().resolves(),
                    find: stub().resolves(),
                };
                initialData = { id: 'bazzinga!' };
                logger = {
                    warn: stub(),
                };
            });

            describe('and "questionCollection.insertMany" throws', () => {
                beforeEach(() => {
                    questionCollection.insertMany.rejects({ error: true });
                });

                it('should log warning', async () => {

                    repository = await initializeRepository({ questionCollection, initialData, logger });

                    assertThat(logger.warn, hasProperties({
                        callCount: is(1),
                        args: contains(contains(
                            is(`Couldn't insert initial data`),
                            is({ error: true }),
                        )),
                    }));
                });

                it('should return a repository object', async () => {

                    repository = await initializeRepository({ questionCollection, initialData, logger });

                    assertThat(repository, hasProperties({
                        getQuestionList: func(),
                        saveAnswers: func(),
                    }));
                });
            });

            describe('and "questionCollection.insertMany" returns a value', () => {
                beforeEach(() => {
                    questionCollection.insertMany.resolves({ success: true });
                });

                it('should log nothing', async () => {

                    repository = await initializeRepository({ questionCollection, initialData, logger });

                    assertThat(logger.warn, hasProperties({
                        callCount: is(0),
                    }));
                });

                it('should return a repository object', async () => {

                    repository = await initializeRepository({ questionCollection, initialData, logger });

                    assertThat(repository, hasProperties({
                        getQuestionList: func(),
                        saveAnswers: func(),
                    }));
                });
            });
        });

        describe('when "questionCollection.createIndex" throws', () => {
            beforeEach(() => {
                questionCollection = {
                    createIndex: stub().rejects({ error: true }),
                    insertMany: stub().resolves(),
                    find: stub().resolves(),
                };
                initialData = { id: 'bazzinga!' };
                logger = {
                    warn: stub(),
                };
            });

            it('should log warning', async () => {

                repository = await initializeRepository({ questionCollection, initialData, logger });

                assertThat(logger.warn, hasProperties({
                    callCount: is(1),
                    args: contains(contains(
                        is(`Couldn't create index`),
                        is({ error: true }),
                    )),
                }));
            });

            it('should return a repository object', async () => {

                repository = await initializeRepository({ questionCollection, initialData, logger });

                assertThat(repository, hasProperties({
                    getQuestionList: func(),
                    saveAnswers: func(),
                }));
            });
        });
    });

    describe('after repository is initialized', () => {
        beforeEach(async () => {
            questionCollection = {
                createIndex: stub().resolves(),
                insertMany: stub().resolves(),
                find: stub().resolves(),
            };
            answerCollection = {
                insertOne: stub().resolves(),
            };
            logger = {
                warn: stub(),
                err: stub(),
            };

            repository = await initializeRepository({ questionCollection, answerCollection, initialData, logger });
        });

        describe('#getQuestionList()', () => {
            describe('when "questionCollection.find" throws', () => {
                beforeEach(() => {
                    questionCollection.find.rejects({ error: true });
                });

                it('should throw an error', async () => {

                    let thrown = false;
                    try {
                        await repository.getQuestionList();
                    } catch (e) {
                        thrown = true;
                    }

                    assertThat(thrown, is(true));
                });
            });

            describe('when "questionCollection.find" returns a non-array value', () => {
                beforeEach(() => {
                    questionCollection.find.resolves({
                        toArray: stub().returns({ success: true }),
                    });
                });

                it('should throw an error', async () => {

                    let thrown = false;
                    try {
                        await repository.getQuestionList();
                    } catch (e) {
                        thrown = true;
                    }

                    assertThat(thrown, is(true));
                });
            });

            describe('when "questionCollection.find" returns an array', () => {
                beforeEach(() => {
                    questionCollection.find.resolves({
                        toArray: stub().resolves([ 1, 2, 3 ]),
                    });
                });

                it('should return this value', async () => {

                    const result = await repository.getQuestionList();

                    assertThat(result, contains(1, 2, 3));
                });
            });
        });

        describe('#saveAnswers()', () => {
            describe('when "answerCollection.insert" throws', () => {
                beforeEach(() => {
                    answerCollection.insertOne.rejects({ error: true });
                });

                it('should throw an error', async () => {

                    let thrown = false;
                    try {
                        await repository.saveAnswers();
                    } catch (e) {
                        thrown = true;
                    }

                    assertThat(thrown, is(true));
                });
            });

            describe('when "answerCollection.insertOne" returns', () => {
                describe('an object with "ok" equal to 1', () => {
                    beforeEach(() => {
                        answerCollection.insertOne.resolves({ success: true });
                    });

                    it('should call "answerCollection.insertOne" with the data given', async () => {

                        await repository.saveAnswers({
                            'first question': '42',
                            'second one': '0815',
                        });

                        assertThat(answerCollection.insertOne, hasProperties({
                            callCount: is(1),
                            args: contains(contains(
                                hasProperties({
                                    'first question': '42',
                                    'second one': '0815',
                                }),
                            )),
                        }));
                    });
                });
            });
        });
    });
});
