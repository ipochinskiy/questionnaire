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
                    const answers = JSON.parse(request.body);
                    // TODO: add server-side validation
                    await repository.saveAnswers(answers);
                    return { success: true };
                },
            },
        ],
    };
}

module.exports = initializeController;
