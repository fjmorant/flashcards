import React from 'react'
import FlashcardsListScreen from './FlashcardsListScreen'
import AddFlashCardScreen from './AddFlashCardScreen'
import EditFlashCardScreen from './EditFlashCardScreen'
import PractiseScreen from './PractiseScreen'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'
import {toIdValue} from 'apollo-utilities'

import {StackNavigator} from 'react-navigation'

const BasicApp = StackNavigator({
  List: {screen: FlashcardsListScreen},
  Add: {screen: AddFlashCardScreen},
  Edit: {screen: EditFlashCardScreen},
  View: {screen: PractiseScreen},
})

export default class App extends React.Component {
  constructor(...args) {
    super(...args)

    this.client = new ApolloClient({
      link: new HttpLink({
        uri: 'https://api.graph.cool/simple/v1/cje7l288q0wgk0115qob7qdrt',
      }),
      cache: new InMemoryCache({
        cacheRedirects: {
          Query: {
            Flashcard: (_, args) => {
              return toIdValue(
                this.client.cache.config.dataIdFromObject({
                  __typename: 'Flashcard',
                  id: args.id,
                })
              )
            },
          },
        },
      }),
    })
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <BasicApp />
      </ApolloProvider>
    )
  }
}
