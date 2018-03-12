import React from 'react'
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import Swipeout from 'react-native-swipeout'
import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'
import {flashcardsQuery, deleteFlashcardMutation} from './queries'

const styles = StyleSheet.create({
  rowContainer: {padding: 8},
  rowText: {
    color: 'rgb(0,0,0)',
  },
})

class FlashcardsListScreen extends React.Component {
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
              update: proxy => {
                const data = proxy.readQuery({query: flashcardsQuery})
                proxy.writeQuery({
                  query: flashcardsQuery,
                  data: {
                    ...data,
                    User: {
                      ...data.User,
                      flashcards: data.User.flashcards.filter(
                        item => item.id !== flashcard.id
                      ),
                    },
                  },
                })
              },
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
        <View key={flashcard.id} style={styles.rowContainer}>
          <Text style={styles.rowText}>Name : {flashcard.name}</Text>
          <Text style={styles.rowText}>Meaning : {flashcard.meaning}</Text>
          <Text style={styles.rowText}>Example : {flashcard.example}</Text>
          <Text style={styles.rowText}>
            Mastered : {(flashcard.mastered || false).toString()}
          </Text>
        </View>
      </Swipeout>
    )
  }

  _keyExtractor = item => item.id

  render() {
    if (this.props.data.loading) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator />
        </View>
      )
    }

    const flashcards = this.props.data.User

    return (
      <View>
        <FlatList
            data={this.props.data.User ? this.props.data.User.flashcards : []}
            keyExtractor={this._keyExtractor}
            onRefresh={() => this.props.data.refetch()}
            refreshing={this.props.data.loading}
            renderItem={this.renderFlashCard}
        />
      </View>
    )
  }
}

export default compose(
  graphql(flashcardsQuery),
  graphql(deleteFlashcardMutation)
)(FlashcardsListScreen)
