import ApolloClient from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import React from 'react';
import ReactDOM from 'react-dom';
import { getAccessToken, setAccessToken } from './accessToken';
import { App } from './App';

const cache = new InMemoryCache({})

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any;
    Promise.resolve(operation)
    //This whole thing is primarily to make sure that the accessToken gets added to our requests
    .then((operation) => {
      const accessToken = getAccessToken()
      if (accessToken) {
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : ''
          }
        })
      }
    })
    .then(() => {
      handle = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });
    })
    .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
          const token = getAccessToken();
          //if undefined
          if (!token) {
            return true;
          }
          try {
            //get the expiration date off the token and make sure it isn't expired
            const {exp} = jwtDecode(token) as any;
            if (Date.now() >= exp * 1000) {
              return false
            } else {
              //assuming no errors, it's valid
              return true
            }
          } catch (err) {
            console.log(err)
            return false;
          }
      },
      //access our refresh api using the refresh cookie
      fetchAccessToken: async () => {
        const res = await fetch(/*'https://guarded-oasis-23318.herokuapp.com/refresh_token'*/'http://localhost:5000/refresh_token', {
          method: 'POST',
          credentials: 'include'
        });

        //must convert to json or it throws a nasty error and wont run handleFetch at all
        return res.json();
      },
      handleFetch: (accessToken) => {
        console.log(`new access token: ${accessToken}`)
        setAccessToken(accessToken)
        console.log(`${getAccessToken()} has been set`)
        return getAccessToken()
      },
      //no specific use for handleResponse at this time
      handleResponse: (operation, accessTokenField) => {},
      handleError: err => {
        //handle any errors that came up
        console.warn('Cannot refresh token. Try to relogin');
        console.error(err);
      }
      //type any because of versioning issues with typescript (there's probably a better way)
    }) as any,
    //generic error handler
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log(graphQLErrors);
      }
      if (networkError) {
        console.log(networkError);
      }
    }),
    //The requestLink we already set up using the auth header and accessToken
    requestLink,
    //declaring the link to the backend server, making sure to use our cookies
    new HttpLink({
      uri: /*'https://guarded-oasis-23318.herokuapp.com/graphql'*/'http://localhost:5000/graphql',
      credentials: 'include'
    })
  ]),
  //add the cache
  cache
});

ReactDOM.render(
  <ApolloProvider client={client as any}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
