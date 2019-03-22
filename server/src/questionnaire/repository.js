async function initRepository({ collection, initialData, logger}) {
    try {
        await collection.createIndex({ 'key': 1 }, { unique: true });
    } catch (e) {
        logger.warn(`Couldn't create index`, e);
    }

    if (!!initialData) {
        try {
            await collection.insertMany(initialData);
        } catch (e) {
            logger.warn(`Couldn't process initial data`, e);
        }
    }

    return {
        getQuestionList: async () => {
            let result;

            try {
                const cursor = await collection.find();
                result = cursor.toArray();
            } catch (e) {
                logger.err(e);
            }

            if (!Array.isArray(result)) {
                throw new Error(`Couldn't get questions from the db`);
            }
            return result;
        }
    };
}

module.exports = initRepository;
