const path = require('path');

const fastify = require('fastify')({
    logger: true,
});

fastify.register(require('fastify-cors'));

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../public'),
    prefix: '/',
});

fastify.listen(5000, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});
