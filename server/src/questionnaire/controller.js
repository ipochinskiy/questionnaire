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
            {
                method: 'post',
                path: '/api/answers',
                handler: async (request, reply) => {
                    return { success: true };
                },
            },
        ],
    };
}

module.exports = initializeController;
