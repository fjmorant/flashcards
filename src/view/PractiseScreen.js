import React, {Component} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import immutable from 'immutable'
import {connect} from 'react-redux'

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
    flex: 1,
    alignItems: 'center',
  },
  flashcardHeaderText: {
    fontSize: 30,
  },
  flashcardDefinitionContainer: {
    flex: 2,
    alignItems: 'center',
  },
  flashcardDefinitionText: {
    fontSize: 25,
  },
  flashcardExampleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  flashcardExampleText: {
    fontSize: 25,
  }
})

const FlashCard = ({
  name,
  meaning,
  example
}) => (
  <View style={{flex: 1}}>
    <View style={styles.flashcardHeaderContainer}>
      <Text style={styles.flashcardHeaderText}>{name}</Text>
    </View>
    <View style={styles.flashcardDefinitionContainer}>
      <Text style={styles.flashcardDefinitionText}>
        {meaning}
      </Text>
    </View>
    <View style={styles.flashcardExampleContainer}>
      <Text style={styles.flashcardExampleText}>{example}</Text>
    </View>
  </View>
)

class PractiseScreen extends Component {

  constructor() {
    super()

    this.state = {
      flashcardIndex: 0,
    }
  }
  static navigationOptions = {
    header: {
      visible: false,
    }
  }

  render() {
    const {goBack} = this.props.navigation
    const flashcard = this.props.flashcards.get(this.state.flashcardIndex)
    const numFlashcards = this.props.flashcards.size

    return (
      <View style={styles.container}>
          <View style={styles.closeContainer}>
            <Button
              onPress={() => goBack()}
              title={'Close'}
            />
          </View>
          <View style={styles.flashCardsContainer}>
            <Button
              onPress={() => this.setState({
                flashcardIndex: (this.state.flashcardIndex || 1) - 1
              })}
              title={'Prev'}
            />
            {
              flashcard ? <FlashCard
                            name={flashcard.get('name')}
                            example={flashcard.get('example')}
                            meaning={flashcard.get('meaning')}
                          /> : null
            }
            <Button
              onPress={() => this.setState({
                flashcardIndex: this.state.flashcardIndex < numFlashcards - 1 ? this.state.flashcardIndex + 1 : numFlashcards - 1
              })}
              title={'Next'}
            />
          </View>
      </View>
    )
  }
}

export default connect(state => ({
    flashcards: state.flashcards.get('flashcards') || immutable.List(),
  }), null)(PractiseScreen);
