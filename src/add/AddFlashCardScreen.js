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
  changeFlashCardMastered,
  changeFlashCardId,
  changeFlashCardName,
  changeFlashCardMeaning,
  changeFlashCardExample,
  saveFlashCard,
  onSearchEntryTriggered,
  onSelectMeaningOption,
  onSetFlashCardAsMastered,
  onSetFlashCardAsUnmastered,
} from './eventHandlers'
import {clearFlashCard} from './actionCreators'
import {connect} from 'react-redux'
import ModalPicker from '../common/ModalPicker'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  input: {
    margin: 4,
    flex: 1,
    fontSize: 19,
  },
});

class AddFlashCardScreen extends Component {

  static navigationOptions = {
    title: 'Add Flash Cards',
    header: {
      right: null,
    }
  }

  constructor() {
    super()

    this.state = {
      modalVisible: false
    }

    this.onOpenModalPicker = this.onOpenModalPicker.bind(this)
    this.toggleMasterFlashcard = this.toggleMasterFlashcard.bind(this)
  }

  componentDidMount() {
    const {state:{params}} = this.props.navigation

    if (params && params.id) {
      const flashcard = this.props.flashcards.find((flashcard) => flashcard.get('id') === params.id)

      this.props.changeFlashCardName(flashcard.get('name'))
      this.props.changeFlashCardMeaning(flashcard.get('meaning'))
      this.props.changeFlashCardExample(flashcard.get('example'))
      this.props.changeFlashCardId(flashcard.get('id'))
      this.props.changeFlashCardMastered(flashcard.get('mastered'))
    } else {
      this.props.clearFlashCard()
    }
  }

  shouldEnableSaveButton() {
    return this.props.name && this.props.meaning && this.props.example;
  }

  onOpenModalPicker() {
    this.setState({modalVisible: true})
  }

  toggleMasterFlashcard() {
    const {state:{params}} = this.props.navigation

    this.props.changeFlashCardMastered(!this.props.mastered)
    this.props.saveFlashCard(params.id)
    this.props.navigation.goBack()
  }

  render() {
    const {state:{params = {}}} = this.props.navigation

    return (
      <View style={styles.container}>
        {
          this.props.pickerOptions.size > 0 ?
              <ModalPicker
                data={this.props.pickerOptions.toJS()}
                initValue="Select part speech"
                modalVisible = {this.state.modalVisible}
                onClose = {() => this.setState({modalVisible: false})}
                onChange={this.props.onSelectMeaningOption} /> : null
        }
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Input
              height={35}
              onChangeText={this.props.changeFlashCardName}
              placeholder='Type word you want to remember'
              returnKeyType='next'
              style={styles.input}
              value={this.props.name}/>
          <ReactNativeButton
            onPress={() => this.props.onSearchEntryTriggered(this.onOpenModalPicker)}
            title={'Find'}
          />
        </View>
        <InputArea
            onChangeText={this.props.changeFlashCardMeaning}
            placeholder='Explanation of the word'
            returnKeyType='next'
            style={styles.input}
            value={this.props.meaning}
        />
        <InputArea
            onChangeText={this.props.changeFlashCardExample}
            placeholder='Example of your word'
            style={styles.input}
            value={this.props.example}
        />
        <View style={{margin: 5}}>
          <Button
              disabled={!this.shouldEnableSaveButton()}
              height={40}
              onPress={() => {
                this.props.saveFlashCard(params.id)
                this.props.navigation.goBack()
              }}
              title='Save'
          />
        </View>
        {
          params.id ?
          <View style={{margin: 5}}>
            <Button
                height={40}
                onPress={this.toggleMasterFlashcard}
                title={this.props.mastered ? 'Mark as Unmastered' : 'Mark as Mastered'}
            />
          </View> : null
        }
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
}

export default connect(state => ({
    flashcards: state.flashcards.get('flashcards'),
    name: state.addFlashCard.get('name'),
    meaning: state.addFlashCard.get('meaning'),
    example: state.addFlashCard.get('example'),
    mastered: state.addFlashCard.get('mastered'),
    pickerOptions: state.addFlashCard.get('pickerOptions').map((result, index) => ({
      key: index,
      label: result.get('definition')
    })),
  }),
  (dispatch) => ({
    changeFlashCardMastered: (mastered) => dispatch(changeFlashCardMastered(mastered)),
    changeFlashCardId: (id) => dispatch(changeFlashCardId(id)),
    changeFlashCardName: (text) => dispatch(changeFlashCardName(text)),
    changeFlashCardMeaning: (text) => dispatch(changeFlashCardMeaning(text)),
    changeFlashCardExample: (text) => dispatch(changeFlashCardExample(text)),
    clearFlashCard: () => dispatch(clearFlashCard()),
    saveFlashCard: (id) => dispatch(saveFlashCard(id)),
    onSearchEntryTriggered: (onOpenModalPicker) => dispatch(onSearchEntryTriggered(onOpenModalPicker)),
    onSelectMeaningOption: (entry) => dispatch(onSelectMeaningOption(entry.key)),
  })
)(AddFlashCardScreen)
