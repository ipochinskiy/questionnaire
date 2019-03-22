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
    let collection;
    let repository, initialData, logger;

    describe('while initializing the repository', () => {
        describe('when initialized without initial data', () => {
            beforeEach(() => {
                collection = {
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

                repository = await initializeRepository({ collection, initialData, logger });

                assertThat(logger.warn, hasProperties({
                    callCount: is(0),
                }));
            });

            it('should return a repository object', async () => {

                repository = await initializeRepository({ collection, initialData, logger });

                assertThat(repository, hasProperties({
                    getQuestionList: func(),
                }));
            });
        });

        describe('when initialized with initial data', () => {
            beforeEach(() => {
                collection = {
                    createIndex: stub().resolves(),
                    insertMany: stub().resolves(),
                    find: stub().resolves(),
                };
                initialData = { id: 'bazzinga!' };
                logger = {
                    warn: stub(),
                };
            });

            describe('and "collection.insertMany" throws', () => {
                beforeEach(() => {
                    collection.insertMany.rejects({ error: true });
                });

                it('should log warning', async () => {

                    repository = await initializeRepository({ collection, initialData, logger });

                    assertThat(logger.warn, hasProperties({
                        callCount: is(1),
                        args: contains(contains(
                            is(`Couldn't process initial data`),
                            is({ error: true }),
                        )),
                    }));
                });

                it('should return a repository object', async () => {

                    repository = await initializeRepository({ collection, initialData, logger });

                    assertThat(repository, hasProperties({
                        getQuestionList: func(),
                    }));
                });
            });

            describe('and "collection.insertMany" returns a value', () => {
                beforeEach(() => {
                    collection.insertMany.resolves({ success: true });
                });

                it('should log nothing', async () => {

                    repository = await initializeRepository({ collection, initialData, logger });

                    assertThat(logger.warn, hasProperties({
                        callCount: is(0),
                    }));
                });

                it('should return a repository object', async () => {

                    repository = await initializeRepository({ collection, initialData, logger });

                    assertThat(repository, hasProperties({
                        getQuestionList: func(),
                    }));
                });
            });
        });

        describe('when "collection.createIndex" throws', () => {
            beforeEach(() => {
                collection = {
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

                repository = await initializeRepository({ collection, initialData, logger });

                assertThat(logger.warn, hasProperties({
                    callCount: is(1),
                    args: contains(contains(
                        is(`Couldn't create index`),
                        is({ error: true }),
                    )),
                }));
            });
        });
    });

    describe('after repository is initialized', () => {
        beforeEach(async () => {
            collection = {
                createIndex: stub().resolves(),
                insertMany: stub().resolves(),
                find: stub().resolves(),
            };
            logger = {
                warn: stub(),
                err: stub(),
            };

            repository = await initializeRepository({ collection, initialData, logger });
        });

        describe('#getQuestionList()', () => {
            describe('when "collection.find" throws', () => {
                beforeEach(() => {
                    collection.find.rejects({ error: true });
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

            describe('when "collection.find" returns a non-array value', () => {
                beforeEach(() => {
                    collection.find.resolves({
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

            describe('when "collection.find" returns an array', () => {
                beforeEach(() => {
                    collection.find.resolves({
                        toArray: stub().resolves([ 1, 2, 3 ]),
                    });
                });

                it('should return this value', async () => {

                    const result = await repository.getQuestionList();

                    assertThat(result, contains(1, 2, 3));
                });
            });
        });
    });
});
