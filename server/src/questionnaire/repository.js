async function initRepository({ questionCollection, answerCollection, initialData, logger}) {
    try {
        await questionCollection.createIndex({ 'key': 1 }, { unique: true });
    } catch (e) {
        logger.warn(`Couldn't create index`, e);
    }

    if (!!initialData) {
        try {
            await questionCollection.insertMany(initialData);
        } catch (e) {
            logger.warn(`Couldn't insert initial data`, e);
        }
    }

    return {
        getQuestionList: async () => {
            let result;

            try {
                const cursor = await questionCollection.find();
                result = await cursor.toArray();
            } catch (e) {
                logger.err(e);
            }

            if (!Array.isArray(result)) {
                throw new Error(`Couldn't get questions from the db`);
            }
            return result;
        },

        saveAnswers: async (data) => {
            await answerCollection.insertOne(data);
        }
    };
}

module.exports = initRepository;
