const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});
async function serverStart() {
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    app.listen(PORT, () => {
        console.log(`APOLLO SERVER RUNNING AT: http://localhost:${PORT}/graphql`);
    });
}
serverStart();