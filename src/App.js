import {Provider} from 'mobx-react'
import React, {Component} from 'react'
import FlashcardsListScreen from './FlashcardsListScreen'
import AddFlashCardScreen from './AddFlashCardScreen'
import PractiseScreen from './PractiseScreen'
import FlashCardsRepository from './FlashCardsRepository'
import FlashCardList from './FlashCardList'

import {StackNavigator} from 'react-navigation'

const BasicApp = StackNavigator({
  List: {screen: FlashcardsListScreen},
  Add: {screen: AddFlashCardScreen},
  View: {screen: PractiseScreen}
}, {})

const flashCardRepository = new FlashCardsRepository()
const flashCardList = new FlashCardList(flashCardRepository)

export default class App extends Component {
	render() {
		return (
			<Provider 
    			flashCardList={flashCardList}
    			flashCardRepository={flashCardRepository}
			>     		
				<BasicApp />
			</Provider>
		)
	}
}
