import React, {Component, PropTypes} from 'react'
import {
  Button as ReactNativeButton,
  StyleSheet,
  View,
} from 'react-native'
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
import immutable from 'immutable'
import request from 'superagent'

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

  constructor(props) {
    super()

    this.toggleMasterFlashcard = this.toggleMasterFlashcard.bind(this)
    this.changeName = this.changeName.bind(this)
    this.changeMeaning = this.changeMeaning.bind(this)
    this.changeExample = this.changeExample.bind(this)
    this.onSearchEntryTriggered = this.onSearchEntryTriggered.bind(this)
    this.onSelectMeaningOption = this.onSelectMeaningOption.bind(this)
    this.clearPickerOptions = this.clearPickerOptions.bind(this)

    const {state:{params}} = props.navigation

    let flashcard = null

    if (params && params.id) {
      flashcard = props.flashcards.find((flashcard) => flashcard.get('id') === params.id)
    } else {
      flashcard = immutable.fromJS({
        name: '',
        meaning: '',
        example: '',
        mastered: false,
      })
    }

    this.state = {
      flashcard,
      modalVisible: false,
      pickerOptions: immutable.List(),
    }
  }

  shouldEnableSaveButton() {
    return this.state.flashcard.get('name') && this.state.flashcard.get('meaning') && this.state.flashcard.get('example')
  }

  toggleMasterFlashcard() {
    const {state:{params}} = this.props.navigation

    this.props.changeFlashCardMastered(!this.props.mastered)
    this.props.saveFlashCard(params.id)
    this.props.navigation.goBack()
  }

  changeName(name) {
    this.setState({
      flashcard: this.state.flashcard.set('name', name)
    })
  }

  changeMeaning(meaning) {
    this.setState({
      flashcard: this.state.flashcard.set('meaning', meaning)
    })
  }

  changeExample(example) {
    this.setState({
      flashcard: this.state.flashcard.set('example', example)
    })
  }

  onSearchEntryTriggered() {
    if (this.state.flashcard.get('name')) {
      const name = this.state.flashcard.get('name').toLowerCase()

      request
      .get(`https://wordsapiv1.p.mashape.com/words/${name}`)
      .set('X-Mashape-Key', 'VQa8Eayg2Kmsh0nklI2QUhfltYkvp19WrI8jsnxrvGVatb8Lf8')
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          Alert.alert(error.message)
          return
        }

        if (response.body.results.length === 1) {
          const entryDictionary = response.body.results[0]
          this.changeMeaning(entryDictionary.definition)
          if (entryDictionary.examples && entryDictionary.examples[0]) {
            this.changeExample(entryDictionary.examples[0])
          }
        } else {
          this.setState({
            pickerOptions: immutable.fromJS(response.body.results),
            modalVisible: true,
          })
        }
      })
    }
  }

  onSelectMeaningOption(entry) {
    const entryDictionary = this.state.pickerOptions.get(entry.key)
    const hasExample = entryDictionary.has('examples') && entryDictionary.getIn(['examples', 0])

    this.setState({
      flashcard: this.state.flashcard.merge({
        meaning: entryDictionary.get('definition'),
        example: hasExample ? entryDictionary.getIn(['examples', 0]) : ''
      }),
      pickerOptions: immutable.List(),
    })
  }

  clearPickerOptions() {
    this.setState({
      pickerOptions: immutable.List(),
      modalVisible: false,
    })
  }

  render() {
    const {state:{params = {}}} = this.props.navigation

    return (
      <View style={styles.container}>
        {
          this.state.pickerOptions.size > 0 ?
              <ModalPicker
                data={this.state.pickerOptions.toJS().map((result, index) => ({
                  key: index,
                  label: result.definition,
                }))}
                initValue="Select part speech"
                modalVisible = {this.state.modalVisible}
                onClose = {this.clearPickerOptions}
                onChange={this.onSelectMeaningOption} /> : null
        }
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Input
              height={35}
              onChangeText={this.changeName}
              placeholder='Type word you want to remember'
              returnKeyType='next'
              style={styles.input}
              value={this.state.flashcard.get('name')}/>
          <ReactNativeButton
            onPress={this.onSearchEntryTriggered}
            title={'Find'}
          />
        </View>
        <InputArea
            onChangeText={this.changeMeaning}
            placeholder='Explanation of the word'
            style={styles.input}
            value={this.state.flashcard.get('meaning')}
        />
        <InputArea
            onChangeText={this.changeExample}
            placeholder='Example of your word'
            style={styles.input}
            value={this.state.flashcard.get('example')}
        />
        <View style={{margin: 5}}>
          <Button
              disabled={!this.shouldEnableSaveButton()}
              height={40}
              onPress={() => {
                this.props.saveFlashCard(this.state.flashcard)
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
  }),
  (dispatch) => ({
    changeFlashCardMastered: (mastered) => dispatch(changeFlashCardMastered(mastered)),
    changeFlashCardId: (id) => dispatch(changeFlashCardId(id)),
    clearFlashCard: () => dispatch(clearFlashCard()),
    saveFlashCard: (id) => dispatch(saveFlashCard(id)),
  })
)(AddFlashCardScreen)
