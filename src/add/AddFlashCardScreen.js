import React, {Component, PropTypes} from 'react'
import {
  Button as ReactNativeButton,
  StyleSheet,
  View,
} from 'react-native';
import Input from '../common/Input'
import InputArea from '../common/InputArea'
import Button from '../common/Button'
import {
  changeFlashCardName,
  changeFlashCardMeaning,
  changeFlashCardExample,
  saveFlashCard,
  onFindButtonPressed,
} from './eventHandlers'
import {clearFlashCard} from './actionCreators'
import {connect} from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  input: {
    margin: 8,
    flex: 1,
  },
});

class AddFlashCardScreen extends Component {

  static navigationOptions = {
    title: 'Add Flash Cards',
    header: {
      right: null,
    }
  }

  componentDidMount() {
    const {state:{params}} = this.props.navigation

    if (params && params.id) {
      const flashcard = this.props.flashcards.find((flashcard) => flashcard.get('id') === params.id)

      this.props.changeFlashCardName(flashcard.get('name'))
      this.props.changeFlashCardMeaning(flashcard.get('meaning'))
      this.props.changeFlashCardExample(flashcard.get('example'))
    } else {
      this.props.clearFlashCard()
    }
  }

  shouldEnableSaveButton() {
    return this.props.name && this.props.meaning && this.props.example;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Input
              height={35}
              onChangeText={this.props.changeFlashCardName}
              placeholder='Type word you want to remember'
              returnKeyType='next'
              style={styles.input}
              value={this.props.name}/>
          <ReactNativeButton
            onPress={this.props.onFindButtonPressed}
            title={'Find'}
          />
        </View>

        <InputArea
            onChangeText={this.props.changeFlashCardMeaning}
            placeholder='Explanation of the word'
            returnKeyType='next'
            style={styles.input}
            value={this.props.meaning}/>
        <InputArea
            onChangeText={this.props.changeFlashCardExample}
            placeholder='Example of your word'
            style={styles.input}
            value={this.props.example}/>
        <Button
            disabled={!this.shouldEnableSaveButton()}
            height={40}
            onPress={() => {
              const {state:{params = {}}} = this.props.navigation
              this.props.saveFlashCard(params.id)
              this.props.navigation.goBack()
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
  example: PropTypes.string,
  meaning: PropTypes.string,
  name: PropTypes.string,
  navigator: PropTypes.object,
  saveFlashCard: PropTypes.func,
};

export default connect(state => ({
    flashcards: state.flashcards.get('flashcards'),
    name: state.addFlashCard.get('name'),
    meaning: state.addFlashCard.get('meaning'),
    example: state.addFlashCard.get('example'),
  }),
  (dispatch) => ({
    changeFlashCardName: (text) => dispatch(changeFlashCardName(text)),
    changeFlashCardMeaning: (text) => dispatch(changeFlashCardMeaning(text)),
    changeFlashCardExample: (text) => dispatch(changeFlashCardExample(text)),
    clearFlashCard: () => dispatch(clearFlashCard()),
    saveFlashCard: (id) => {
      dispatch(saveFlashCard(id))
    },
    onFindButtonPressed: () => dispatch(onFindButtonPressed())
  })
)(AddFlashCardScreen);
