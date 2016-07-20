import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Input from './common/Input';
import InputArea from './common/InputArea';
import Button from './common/Button';
import {
  changeFlashCardName,
  changeFlashCardMeaning,
  changeFlashCardExample,
  saveFlashCard,
} from './flashcards/addFlashCardDuck';
import {connect} from 'react-redux';

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

class AddFlashCardScreen extends Component {

  shouldEnableSaveButton() {
    return this.props.flashCardName && this.props.flashCardMeaning && this.props.flashCardExample;
  }

  render() {
    return (
      <View style={{flex: 1, padding: 10}}>
        <Input
            style={{margin: 8}}
            height={35}
            onChangeText={this.props.changeFlashCardName}
            placeholder='Type word you want to remember'
            returnKeyType='next'
            value={this.props.flashCardName}/>
        <InputArea
            onChangeText={this.props.changeFlashCardMeaning}
            style={{margin: 8}}
            placeholder='Explanation of the word'
            returnKeyType='next'
            value={this.props.flashCardMeaning}/>
        <InputArea
            onChangeText={this.props.changeFlashCardExample}
            style={{margin: 8}}
            placeholder='Example of your word'
            value={this.props.flashCardExample}/>
        <Button
            disabled={!this.shouldEnableSaveButton()}
            height={40}
            onPress={this.props.saveFlashCard}
            title='Save'/>
      </View>
    );
  }
}

export default connect(state => ({
    flashCardName: state.addFlashCard.get('flashCardName'),
    flashCardMeaning: state.addFlashCard.get('flashCardMeaning'),
    flashCardExample: state.addFlashCard.get('flashCardExample'),
  }),
  (dispatch) => ({
    changeFlashCardName: (text) => dispatch(changeFlashCardName(text)),
    changeFlashCardMeaning: (text) => dispatch(changeFlashCardMeaning(text)),
    changeFlashCardExample: (text) => dispatch(changeFlashCardExample(text)),
    saveFlashCard: () => dispatch(saveFlashCard()),
  })
)(AddFlashCardScreen);
