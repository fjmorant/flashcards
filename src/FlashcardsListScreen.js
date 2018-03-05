import React, {Component} from 'react'
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import List from './common/List'
import Swipeout from 'react-native-swipeout'
import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'

const flashcardsQuery = gql`
  query GetFlashcardsByUser {
    User(id: "cje8649pvb3u201775435vabn") {
      name
      flashcards(orderBy: id_DESC) {
        id
        name
        example
        mastered
        meaning
      }
    }
  }
`
const deleteFlashcardMutation = gql`
  mutation DeleteFlashcard($id: ID!) {
    deleteFlashcard(id: $id) {
      id
      name
    }
  }
`

const styles = StyleSheet.create({
  rowContainer: {padding: 8},
  rowText: {
    color: 'rgb(0,0,0)',
  },
})

class FlashcardsListScreen extends Component<
  void,
  {
    flashCardList: any,
    navigation: any,
  },
  void
> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Flash Cards',
      headerRight: (
        <Button onPress={() => navigation.navigate('Add')} title={'Add'} />
      ),
      headerLeft: (
        <Button
            onPress={() => navigation.navigate('View')}
            title={'Practise'}
        />
      ),
    }
  }

  renderFlashCard = ({item: flashcard}) => {
    const swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => {
          this.props
            .mutate({
              variables: {
                id: flashcard.id,
              },
              refetchQueries: [
                {
                  query: flashcardsQuery,
                },
              ],
            })
            .then(({data}) => {
              console.log('Success!!!')
            })
            .catch(error => {
              console.log(error)
              alert('Error deleting flashcard')
            })
        },
      },
    ]

    return (
      <Swipeout autoClose right={swipeoutBtns}>
        <TouchableOpacity>
          <View style={styles.rowContainer}>
            <Text style={styles.rowText}>Name : {flashcard.name}</Text>
            <Text style={styles.rowText}>Meaning : {flashcard.meaning}</Text>
            <Text style={styles.rowText}>Example : {flashcard.example}</Text>
            <Text style={styles.rowText}>
              Mastered : {(flashcard.mastered || false).toString()}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeout>
    )
  }

  _keyExtractor = item => item.id

  render() {
    const loading = this.props.data.loading
    const error = this.props.data.error

    if (loading) {
      console.log('Loading')
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    if (error) {
      console.log('Error: ', error)
      return (
        <View>
          <Text>Error found</Text>
        </View>
      )
    }

    const flashcards = this.props.data.User.flashcards

    console.log('Render: ', JSON.stringify(flashcards))
    return (
      <View>
        {flashcards.map(flashcard => this.renderFlashCard({item: flashcard}))}
      </View>
    )
  }
}

// <FlatList
//     data={flashcards}
//     extraData={{numberFlashcards: this.props.data.User.flashcards.length}}
//     keyExtractor={this._keyExtractor}
//     onRefresh={() => this.props.data.refetch()}
//     refreshing={this.props.data.networkStatus === 4}
//     renderItem={this.renderFlashCard}
// />

export default compose(
  graphql(flashcardsQuery),
  graphql(deleteFlashcardMutation)
)(FlashcardsListScreen)
