const path = require('path');
const questionnaire = require('./questionnaire/index');

const fastify = require('fastify')({
    logger: true,
});

fastify.register(require('fastify-mongodb'), {
    forceClose: true,
    url: 'mongodb://mongodb:27017/',
});

fastify.register(require('fastify-cors'));

fastify.register(questionnaire);

fastify.listen(5000, '0.0.0.0', function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});
