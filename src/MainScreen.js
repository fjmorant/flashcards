import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

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
  }

  onNavigatorEvent(event) {
      if (event.id == 'addFlashCard') {
        this.props.navigator.push({
          screen: 'com.flashcards.AddFlashCardScreen',
          title: 'Add FlashCard',
          animated: true, // does the push have transition animation or does it happen immediately (optional)
        });
      }
  }

  render() {
    return (
      <View>
          <Text>
            Main Screen
          </Text>
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

export default FlashCards;
