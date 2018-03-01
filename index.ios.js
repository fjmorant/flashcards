import App from './src/App'
import React from 'react'
import {AppRegistry} from 'react-native'

import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cje7l288q0wgk0115qob7qdrt',
  }),
  cache: new InMemoryCache(),
})

const AppApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

AppRegistry.registerComponent('FlashCards', () => AppApollo)
