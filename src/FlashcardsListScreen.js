import React, {Component} from 'react'
import {Text, View, Button, TouchableOpacity, StyleSheet} from 'react-native'
import List from './common/List'
import Swipeout from 'react-native-swipeout'
import {observer, inject} from 'mobx-react/native'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

const query = gql`
  query GetFlashcardsByUser {
    User(id: "cje8649pvb3u201775435vabn") {
      name
      flashcards {
        id
        name
        example
        mastered
        meaning
      }
    }
  }
`

const styles = StyleSheet.create({
  rowContainer: {padding: 8},
  rowText: {
    color: 'rgb(0,0,0)',
  },
})

@inject('flashCardList')
@observer
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

  renderFlashCard = flashcard => {
    const swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => this.props.flashCardList.delete(flashcard.id),
      },
    ]

    return (
      <Swipeout autoClose right={swipeoutBtns}>
        <TouchableOpacity
            onPress={() =>
            this.props.navigation.navigate('Add', {id: flashcard.id})
          }>
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

  render() {
    const loading = this.props.data.loading
    const error = this.props.data.error

    console.log(this.props.data)

    if (loading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    if (error) {
      return (
        <View>
          <Text>Error found</Text>
        </View>
      )
    }

    const flashcards = this.props.data.User.flashcards

    return (
      <View>
        <List items={flashcards} renderItem={this.renderFlashCard} />
      </View>
    )
  }
}

export default graphql(query, {options: {pollInterval: 5000}})(
  FlashcardsListScreen
)
