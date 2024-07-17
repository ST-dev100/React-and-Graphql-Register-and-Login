import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider,gql,createHttpLink} from '@apollo/client';
import  createUploadLink  from 'apollo-upload-client/createUploadLink.mjs';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import './index.css'
import toast, { Toaster } from 'react-hot-toast';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Access-Control-Allow-Origin': 'http://localhost:5173',
    },
  };
});

const client = new ApolloClient({
  uri: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: 'http://localhost:4000/',
    
    onError: (error) => {
      console.error('Error in createUploadLink:', error);
    },
  }),
});

// you have to check the connection first by writing the below code

// client
//   .query({
//     query: gql`
//      query ExampleQuery {
//       books {
//         author
//       }
//      }
//     `,
//   })
//   .then((result) => console.log(result));

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
    <Toaster />
  </ApolloProvider>,
);