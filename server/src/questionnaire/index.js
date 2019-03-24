const INITIAL_DATA = require('../../questions.json');

const initializeController = require('./controller');
const initializeRepository = require('./repository');

async function routes(fastify, options) {
    const db = fastify.mongo.client.db('questionnaire');
    const questionCollection = db.collection('questions');
    const answerCollection = db.collection('answers');

    const repository = await initializeRepository({
        questionCollection,
        answerCollection,
        initialData: INITIAL_DATA,
        logger: fastify.log,
    });
    const controller = initializeController({ repository });

    controller.routes.forEach(({ method, path, handler }) => {
        fastify[method](path, handler);
    });
}

module.exports = routes;
