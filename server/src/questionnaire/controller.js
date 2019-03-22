function initializeController({ repository }) {
    return {
        routes: [
            {
                method: 'get',
                path: '/api/questions',
                handler: async (request, reply) => {
                    return await repository.getQuestionList();
                },
            },
        ],
    };
}

module.exports = initializeController;
