import React, {Component} from 'react'
import {
  Alert,
  Button as ReactNativeButton,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native'
import Input from './common/Input'
import InputArea from './common/InputArea'
import Button from './common/Button'
import ModalPicker from './common/ModalPicker'
import request from 'superagent'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
import shortid from 'shortid'
import moment from 'moment'

import {
  flashcardsQuery,
  updateFlashcard,
  getFlashCardByIdAndUser,
} from './queries'

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
  inputContainer: {flexDirection: 'row', alignItems: 'center'},
  buttonContainer: {margin: 5},
})

class AddFlashCardScreen extends Component<
  void,
  {
    navigation: any,
    flashCardList: any,
    mastered: boolean,
  },
  void
> {
  static navigationOptions = () => ({
    title: 'Edit Flash Card',
    headerRight: null,
  })

  constructor(props) {
    super()

    this.state = {
      modalVisible: false,
      pickerOptions: [],
      id: '',
      name: '',
      meaning: '',
      example: '',
      mastered: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.data.Flashcard) {
      const flashcard = nextProps.data.Flashcard

      this.setState({
        id: flashcard.id,
        name: flashcard.name,
        meaning: flashcard.meaning,
        example: flashcard.example,
        mastered: flashcard.mastered,
      })
    }
  }

  shouldEnableSaveButton() {
    return this.state.name && this.state.meaning && this.state.example
  }

  toggleMasterFlashcard = () => {
    this.setState(
      {
        mastered: !this.state.mastered,
      },
      () => this.onPressSaveButton()
    )
  }

  changeName = (name: string) => {
    this.setState({
      name,
    })
  }

  changeMeaning = (meaning: string) => {
    this.setState({
      meaning,
    })
  }

  changeExample = example => {
    this.setState({
      example,
    })
  }

  onSearchEntryTriggered = () => {
    if (this.state.name) {
      const name = this.state.name.toLowerCase()

      request
        .get(`https://wordsapiv1.p.mashape.com/words/${name}`)
        .set(
          'X-Mashape-Key',
          'VQa8Eayg2Kmsh0nklI2QUhfltYkvp19WrI8jsnxrvGVatb8Lf8'
        )
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
              pickerOptions: response.body.results,
              modalVisible: true,
            })
          }
        })
    }
  }

  onSelectMeaningOption = entry => {
    const entryDictionary = this.state.pickerOptions[entry.key]
    const hasExample = entryDictionary.examples && entryDictionary.examples[0]

    this.changeMeaning(entryDictionary.definition)
    this.changeExample(hasExample ? entryDictionary.examples[0] : '')

    this.setState({
      pickerOptions: [],
    })
  }

  clearPickerOptions = () => {
    this.setState({
      pickerOptions: [],
      modalVisible: false,
    })
  }

  onPressSaveButton = () => {
    this.props
      .mutate({
        variables: {
          id: this.state.id,
          name: this.state.name,
          meaning: this.state.meaning,
          example: this.state.example,
          mastered: this.state.mastered,
        },
        update: proxy => {
          const data = proxy.readQuery({query: flashcardsQuery})
          const oldFlashcard = data.User.flashcards.find(
            item => item.id === this.state.id
          )
          const indexOld = data.User.flashcards.indexOf(oldFlashcard)

          data.User.flashcards[indexOld] = {
            ...oldFlashcard,
            name: this.state.name,
            meaning: this.state.meaning,
            example: this.state.example,
            mastered: this.state.mastered,
          }

          proxy.writeQuery({
            query: flashcardsQuery,
            data: {
              ...data,
              User: {
                ...data.User,
                flashcards: data.User.flashcards,
              },
            },
          })
        },
      })
      .then(({data}) => {
        this.props.navigation.goBack()
      })
      .catch(error => {
        console.log(error)
        alert('Error saving flashcard')
      })
  }

  render() {
    const {state: {params = {}}} = this.props.navigation || {
      state: {params: {}},
    }

    if (this.props.data.loading && params.id) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {this.state.pickerOptions.size > 0 ? (
          <ModalPicker
              data={this.state.pickerOptions.map((result, index) => ({
              key: index,
              label: result.definition,
            }))}
              initValue="Select part speech"
              modalVisible={this.state.modalVisible}
              onChange={this.onSelectMeaningOption}
              onClose={this.clearPickerOptions}
          />
        ) : null}
        <View style={styles.inputContainer}>
          <Input
              height={35}
              onChangeText={this.changeName}
              placeholder="Type word you want to remember"
              returnKeyType="next"
              style={styles.input}
              value={this.state.name}
          />
          <ReactNativeButton
              onPress={this.onSearchEntryTriggered}
              title={'Find'}
          />
        </View>
        <InputArea
            onChangeText={this.changeMeaning}
            placeholder="Explanation of the word"
            style={styles.input}
            value={this.state.meaning}
        />
        <InputArea
            onChangeText={this.changeExample}
            placeholder="Example of your word"
            style={styles.input}
            value={this.state.example}
        />
        <View style={styles.buttonContainer}>
          <Button
              disabled={!this.shouldEnableSaveButton()}
              height={40}
              onPress={this.onPressSaveButton}
              title="Save"
          />
        </View>
        {params.id ? (
          <View style={styles.buttonContainer}>
            <Button
                height={40}
                onPress={this.toggleMasterFlashcard}
                title={
                this.state.mastered ? 'Mark as Unmastered' : 'Mark as Mastered'
              }
            />
          </View>
        ) : null}
      </View>
    )
  }
}

export default compose(
  graphql(getFlashCardByIdAndUser, {
    options: props => ({
      variables: {
        flashCardId: props.navigation.state.params.id,
      },
    }),
  }),
  graphql(updateFlashcard)
)(AddFlashCardScreen)
