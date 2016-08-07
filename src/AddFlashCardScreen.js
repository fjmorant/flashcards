import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
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
    padding: 10
  },
  input: {
    margin: 8,
  },
});

class AddFlashCardScreen extends Component {

  shouldEnableSaveButton() {
    return this.props.flashCardName && this.props.flashCardMeaning && this.props.flashCardExample;
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
            height={35}
            onChangeText={this.props.changeFlashCardName}
            placeholder='Type word you want to remember'
            returnKeyType='next'
            style={styles.input}
            value={this.props.flashCardName}/>
        <InputArea
            onChangeText={this.props.changeFlashCardMeaning}
            placeholder='Explanation of the word'
            returnKeyType='next'
            style={styles.input}
            value={this.props.flashCardMeaning}/>
        <InputArea
            onChangeText={this.props.changeFlashCardExample}
            placeholder='Example of your word'
            style={styles.input}
            value={this.props.flashCardExample}/>
        <Button
            disabled={!this.shouldEnableSaveButton()}
            height={40}
            onPress={() => {
              this.props.saveFlashCard();
              this.props.navigator.pop();
            }}
            title='Save'/>
      </View>
    );
  }
}

AddFlashCardScreen.propTypes = {
  changeFlashCardExample: PropTypes.func,
  changeFlashCardMeaning: PropTypes.func,
  changeFlashCardName: PropTypes.func,
  flashCardExample: PropTypes.string,
  flashCardMeaning: PropTypes.string,
  flashCardName: PropTypes.string,
  navigator: PropTypes.object,
  saveFlashCard: PropTypes.func,
};

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
