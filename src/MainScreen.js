import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import List from './common/List';
import {fromJS} from 'immutable';
import {connect} from 'react-redux';
import {loadFlashCardsFromPersistance, deleteFlashCard} from './flashcards/flashcardsDuck'
import Swipeout from 'react-native-swipeout'

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

class FlashCards extends Component {

  constructor(props) {
    super(props)
    this.renderFlashCard = this.renderFlashCard.bind(this)
  }

  componentDidMount() {
    this.props.loadFlashCardsFromPersistance();
  }

  static navigationOptions = {
    title: 'Flash Cards',
    header: ({navigate, state}) => {
      let right = (
        <Button
          title={'Add'}
          onPress={() => navigate('Add')}
        />
      )
      return {right}
    },
  }

  renderFlashCard(flashcard) {
    const swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => this.props.deleteFlashCard(flashcard.get('id')),
      }
    ]

    return (
      <Swipeout
          autoClose
          right={swipeoutBtns}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Add', {id: flashcard.get('id')})}>
            <View style={{padding: 8}}>
              <Text style={{color: 'rgb(0,0,0)'}}>
                Name : {flashcard.get('flashCardName')}
              </Text>
              <Text style={{color: 'rgb(0,0,0)'}}>
                Meaning : {flashcard.get('flashCardMeaning')}
              </Text>
              <Text style={{color: 'rgb(0,0,0)'}}>
                Example : {flashcard.get('flashCardExample')}
              </Text>
            </View>
          </TouchableOpacity>
      </Swipeout>
    );
  }

  render() {
    return (
      <View>
          <List
            items={this.props.flashcards}
            renderItem={this.renderFlashCard}/>
      </View>
    );
  }
}

export default connect(state => ({
    flashcards: state.flashcards.get('flashcards').reverse(),
  }),
  (dispatch) => ({
    loadFlashCardsFromPersistance: () => dispatch(loadFlashCardsFromPersistance()),
    deleteFlashCard: (id) => dispatch(deleteFlashCard(id)),
  }),
)(FlashCards);
