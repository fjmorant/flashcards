import gql from 'graphql-tag'
import moment from 'moment'
import * as React from 'react'
import {graphql} from 'react-apollo'
import {
  Alert,
  Button as ReactNativeButton,
  StyleSheet,
  View,
} from 'react-native'
import * as shortid from 'shortid'
import * as request from 'superagent'
import Button from './common/Button'
import Input from './common/Input'
import InputArea from './common/InputArea'
import ModalPicker from './common/ModalPicker'

import {flashcardsQuery} from './queries'

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

export interface IProps {
  navigation: any
  flashCardList: any
  mastered: boolean
  mutate: any
}

export interface IState {
  modalVisible: boolean
  pickerOptions: Array<{
    definition: string
    examples: Array<string>
  }>
  name: string
  meaning: string
  example: string
  mastered: boolean
}

export class AddFlashCardScreen extends React.Component<IProps, IState> {
  public static navigationOptions = () => ({
    title: 'Add Flash Cards',
    headerRight: null,
  })

  constructor(props: IProps) {
    super(props)

    this.state = {
      modalVisible: false,
      pickerOptions: [],
      name: '',
      meaning: '',
      example: '',
      mastered: false,
    }
  }

  public shouldEnableSaveButton() {
    return this.state.name && this.state.meaning && this.state.example
  }

  public changeName = (name: string) => {
    this.setState({
      name,
    })
  }

  public changeMeaning = (meaning: string) => {
    this.setState({
      meaning,
    })
  }

  public changeExample = (example: string) => {
    this.setState({
      example,
    })
  }

  public onSearchEntryTriggered = () => {
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

  public onSelectMeaningOption = (entry: {key: number}) => {
    const entryDictionary = this.state.pickerOptions[entry.key]
    const hasExample = entryDictionary.examples && entryDictionary.examples[0]

    this.changeMeaning(entryDictionary.definition)
    this.changeExample(hasExample ? entryDictionary.examples[0] : '')

    this.setState({
      pickerOptions: [],
    })
  }

  public clearPickerOptions = () => {
    this.setState({
      pickerOptions: [],
      modalVisible: false,
    })
  }

  public onPressSaveButton = async () => {
    try {
      await this.props.mutate({
        variables: {
          name: this.state.name,
          meaning: this.state.meaning,
          example: this.state.example,
          mastered: false,
        },
        update: (proxy: any) => {
          const data = proxy.readQuery({query: flashcardsQuery})
          const newFlashcards = [
            {
              __typename: 'Flashcard',
              createdAt: moment().toISOString(),
              id: shortid.generate(),
              name: this.state.name,
              meaning: this.state.meaning,
              example: this.state.example,
              mastered: false,
            },
            ...data.User.flashcards,
          ]

          proxy.writeQuery({
            query: flashcardsQuery,
            data: {
              ...data,
              User: {
                ...data.User,
                flashcards: newFlashcards,
              },
            },
          })
        },
      })

      this.props.navigation.goBack()
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error)
      alert('Error saving flashcard')
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        {this.state.pickerOptions.length > 0 ? (
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
      name
      meaning
      example
      mastered
    }
  }
`

export default graphql<
  {
    id: string
    name: string
    meaning: string
    example: string
    mastered: boolean
  },
  IProps
>(createNewFlashcard)(AddFlashCardScreen)
