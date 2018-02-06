import {observer, inject} from 'mobx-react/native'
import React, {Component} from 'react'
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

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
})

const FlashCard = ({name, meaning, mode, example}) => (
  <View style={{flex: 1}}>
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

const Arrow = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={{color: 'black', fontSize: 35}}>{title}</Text>
  </TouchableOpacity>
)

@inject('flashCardList')
@observer
class PractiseScreen extends Component {
  constructor() {
    super()

    this.state = {
      flashcardIndex: 0,
      mode: 'EXAMPLE',
    }
    this.goNextCard = this.goNextCard.bind(this)
    this.goPrevCard = this.goPrevCard.bind(this)
    this.switchMode = this.switchMode.bind(this)
  }

  componentWillMount() {
    if (!this.props.flashCardList.list.length) {
      const {goBack} = this.props.navigation

      goBack()
      alert('No flash cards found!')
    }
  }

  static navigationOptions = ({navigation, screenProps}) => {
    return {
      header: null,
    }
  }

  goNextCard() {
    const numFlashcards = this.props.flashCardList.list.length
    const oldIndex = this.state.flashcardIndex
    const flashcardIndex =
      oldIndex < numFlashcards - 1 ? oldIndex + 1 : numFlashcards - 1

    this.setState({flashcardIndex})
  }

  goPrevCard() {
    const flashcardIndex = (this.state.flashcardIndex || 1) - 1

    this.setState({flashcardIndex})
  }

  switchMode() {
    this.setState({
      mode: this.state.mode === 'DEFINITION' ? 'EXAMPLE' : 'DEFINITION',
    })
  }

  render() {
    const {goBack} = this.props.navigation
    const flashcard = this.props.flashCardList.list[this.state.flashcardIndex]
    const numFlashcards = this.props.flashCardList.list.length

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

export default PractiseScreen
