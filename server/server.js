const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/'));
  })

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

const serverStart = async () => {
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`APOLLO SERVER RUNNING AT: http://localhost:${PORT}/graphql`);
        });        
    });
};

serverStart();
