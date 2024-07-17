import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import GraphQLUpload from 'graphql-upload/graphqlUploadExpress.mjs';  
import express from "express"
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import cors from 'cors'
import Upload from 'graphql-upload/Upload.mjs';
import typeDefs from './typeDefs/userTypeDefs.js';  
import resolvers from './resolvers/resolvers.js';
import db, { checkConnection } from './db/db.js';

const app = express();  
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();
await checkConnection();
app.use(
  '/',
  GraphQLUpload(),
  cors({ origin: 'http://localhost:5173'}),
  express.json(),
  (req, res, next) => {
      req.headers['x-apollo-operation-name'] = 'up';
      next();
    },
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);