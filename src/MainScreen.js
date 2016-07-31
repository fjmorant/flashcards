import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import List from './common/List';
import {fromJS} from 'immutable';
import {connect} from 'react-redux';

class FlashCards extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Add',
        id: 'addFlashCard',
        showAsAction: 'ifRoom'
      },
    ]
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.renderFlashCard = this.renderFlashCard.bind(this);
  }

  onNavigatorEvent(event) {
      if (event.id == 'addFlashCard') {
        this.props.navigator.push({
          screen: 'com.flashcards.AddFlashCardScreen',
          title: 'Add FlashCard',
          animated: true,
        });
      }
  }

  renderFlashCard(flashcard) {
    console.log('flashcard: ', flashcard);
    return (
      <View style={{padding: 5}}>
        <Text style={{color: 'rgb(0,0,0)'}}>
          {flashcard.get('flashCardName')}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View>
          <List
            style={{flex: 1}}
            items={this.props.flashcards}
            renderItem={this.renderFlashCard}/>
      </View>
    );
  }
}

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
});

export default connect(state => ({
    flashcards: state.flashcards.get('flashcards'),
  }),
  null,
)(FlashCards);
