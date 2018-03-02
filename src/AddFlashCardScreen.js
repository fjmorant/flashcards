import React, {Component} from 'react'
import {
  Alert,
  Button as ReactNativeButton,
  StyleSheet,
  View,
} from 'react-native'
import Input from './common/Input'
import InputArea from './common/InputArea'
import Button from './common/Button'
import ModalPicker from './common/ModalPicker'
import request from 'superagent'
import {observer} from 'mobx-react/native'
import FlashCard from './FlashCard'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

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

@observer(['flashCardList'])
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
    title: 'Add Flash Cards',
    headerRight: null,
  })

  flashcard = new FlashCard()

  constructor(props) {
    super()

    this.state = {
      modalVisible: false,
      pickerOptions: [],
    }

    if (props.navigation.state.params) {
      this.flashcard = props.flashCardList.getFlashCard(
        props.navigation.state.params.id
      )
    }
  }

  shouldEnableSaveButton() {
    return (
      this.flashcard.name && this.flashcard.meaning && this.flashcard.example
    )
  }

  toggleMasterFlashcard = () => {
    this.flashcard.toggleMaster()
    this.props.flashCardList.edit(this.flashcard)
    this.props.navigation.goBack()
  }

  changeName = (name: string) => {
    this.flashcard.changeName(name)
  }

  changeMeaning = (meaning: string) => {
    this.flashcard.changeMeaning(meaning)
  }

  changeExample = example => {
    this.flashcard.changeExample(example)
  }

  onSearchEntryTriggered = () => {
    if (this.flashcard.name) {
      const name = this.flashcard.name.toLowerCase()

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

    this.flashcard.changeMeaning(entryDictionary.definition)
    this.flashcard.changeExample(hasExample ? entryDictionary.examples[0] : '')

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
          name: this.flashcard.name,
          meaning: this.flashcard.meaning,
          example: this.flashcard.example,
          mastered: false,
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
    const {state: {params = {}}} = this.props.navigation

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
              value={this.flashcard.name}
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
            value={this.flashcard.meaning}
        />
        <InputArea
            onChangeText={this.changeExample}
            placeholder="Example of your word"
            style={styles.input}
            value={this.flashcard.example}
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
                this.props.mastered ? 'Mark as Unmastered' : 'Mark as Mastered'
              }
            />
          </View>
        ) : null}
      </View>
    )
  }
}

const createNewFlashcard = gql`
  mutation submitNewFlashcard(
    $name: String!
    $meaning: String!
    $example: String!
    $mastered: Boolean!
  ) {
    createFlashcard(
      name: $name
      meaning: $meaning
      example: $example
      mastered: $mastered
      userId: "cje8649pvb3u201775435vabn"
    ) {
      id
    }
  }
`

export default graphql(createNewFlashcard)(AddFlashCardScreen)
