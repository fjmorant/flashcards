import * as React from 'react'
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import {graphql} from 'react-apollo'
import {flashcardsQuery} from './queries'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  closeContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  flashCardsContainer: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flashcardHeaderContainer: {
    alignItems: 'center',
  },
  flashcardHeaderText: {
    fontSize: 30,
  },
  flashcardDefinitionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
  flashcardDefinitionText: {
    fontSize: 25,
    textAlign: 'justify',
  },
  flashcardExampleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
  flashcardExampleText: {
    fontSize: 25,
    textAlign: 'justify',
  },
  arrowText: {color: 'black', fontSize: 35},
  flashCardContainer: {flex: 1},
  loadingView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
})

// tslint:disable-next-line:variable-name
const FlashCard = ({
  name,
  meaning,
  mode,
  example,
}: {
  name: string
  meaning: string
  mode: string
  example: string
}) => (
  <View style={styles.flashCardContainer}>
    <View style={styles.flashcardHeaderContainer}>
      <Text style={styles.flashcardHeaderText}>{name}</Text>
    </View>
    {mode === 'DEFINITION' ? (
      <View style={styles.flashcardDefinitionContainer}>
        <Text style={styles.flashcardDefinitionText}>{meaning}</Text>
      </View>
    ) : null}
    {mode === 'EXAMPLE' ? (
      <View style={styles.flashcardExampleContainer}>
        <Text style={styles.flashcardExampleText}>{example}</Text>
      </View>
    ) : null}
  </View>
)

// tslint:disable-next-line:variable-name
const Arrow = ({title, onPress}: {title: string; onPress: any}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.arrowText}>{title}</Text>
  </TouchableOpacity>
)

export interface IProps {
  flashCardList: any
  navigation: any
  data: {
    loading: boolean
    User: {
      flashcards: Array<any>
    }
  }
}

export interface IState {
  flashcardIndex: number
  mode: string
}

export class PractiseScreen extends React.Component<IProps, IState> {
  public static navigationOptions = () => {
    return {
      header: null,
    }
  }

  constructor(props: IProps) {
    super(props)

    this.state = {
      flashcardIndex: 0,
      mode: 'EXAMPLE',
    }
    this.goNextCard = this.goNextCard.bind(this)
    this.goPrevCard = this.goPrevCard.bind(this)
    this.switchMode = this.switchMode.bind(this)
  }

  public componentWillMount() {
    if (!this.props.data.loading && !this.props.data.User.flashcards.length) {
      const {goBack} = this.props.navigation

      goBack()
      alert('No flash cards found!')
    }
  }

  public goNextCard() {
    const numFlashcards = this.props.data.User.flashcards.length
    const oldIndex = this.state.flashcardIndex
    const flashcardIndex =
      oldIndex < numFlashcards - 1 ? oldIndex + 1 : numFlashcards - 1

    this.setState({flashcardIndex})
  }

  public goPrevCard() {
    const flashcardIndex = (this.state.flashcardIndex || 1) - 1

    this.setState({flashcardIndex})
  }

  public switchMode() {
    this.setState({
      mode: this.state.mode === 'DEFINITION' ? 'EXAMPLE' : 'DEFINITION',
    })
  }

  public render() {
    const {goBack} = this.props.navigation
    const loading = this.props.data.loading

    if (loading) {
      return (
        <View style={styles.loadingView}>
          <Text>Loading</Text>
        </View>
      )
    }

    const flashcard = this.props.data.User.flashcards[this.state.flashcardIndex]

    return (
      <View style={styles.container}>
        <View style={styles.closeContainer}>
          <Button onPress={() => goBack()} title={'Close'} />
        </View>
        <View style={styles.flashCardsContainer}>
          <Arrow onPress={this.goPrevCard} title={'<'} />
          {flashcard ? (
            <FlashCard
              example={flashcard.example}
              meaning={flashcard.meaning}
              mode={this.state.mode}
              name={flashcard.name}
            />
          ) : null}
          <Arrow onPress={this.goNextCard} title={'>'} />
        </View>
        <Button
          onPress={this.switchMode}
          title={
            this.state.mode === 'DEFINITION' ? 'See Example' : 'See Definition'
          }
        />
      </View>
    )
  }
}

export default graphql<
  {
    User: {
      id: string
      flashcards: Array<{
        id: string
        name: string
        example: string
        mastered: boolean
        meaning: string
      }>
    }
  },
  any
>(flashcardsQuery)(PractiseScreen)
