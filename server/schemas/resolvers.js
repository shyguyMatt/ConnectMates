const { Group, Index, Interest, User } = require('../models');

const resolvers = {
    Query: {
        hello: () => 'Hello, GraphQL!',
    },
};

module.exports = resolvers;
