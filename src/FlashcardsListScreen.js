import React, {Component} from 'react'
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native'
import List from './common/List'
import Swipeout from 'react-native-swipeout'
import {observer, inject} from 'mobx-react'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(245, 252, 255)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'rgb(51, 51, 51)',
    marginBottom: 5,
  },
})

@inject('flashCardList')
@observer
class FlashcardsListScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: 'Flash Cards',
      headerRight: (
        <Button title={'Add'} onPress={() => navigation.navigate('Add')} />
      ),
      headerLeft: (
        <Button
          title={'Practise'}
          onPress={() => navigation.navigate('View')}
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
          <View style={{padding: 8}}>
            <Text style={{color: 'rgb(0,0,0)'}}>Name : {flashcard.name}</Text>
            <Text style={{color: 'rgb(0,0,0)'}}>
              Meaning : {flashcard.meaning}
            </Text>
            <Text style={{color: 'rgb(0,0,0)'}}>
              Example : {flashcard.example}
            </Text>
            <Text style={{color: 'rgb(0,0,0)'}}>
              Mastered : {(flashcard.mastered || false).toString()}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeout>
    )
  }

  render() {
    return (
      <View>
        <List
          items={this.props.flashCardList.list}
          renderItem={this.renderFlashCard}
        />
      </View>
    )
  }
}

export default FlashcardsListScreen
