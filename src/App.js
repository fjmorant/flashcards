import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import flashcards from './list/flashcardsDuck'
import addFlashCard from './add'
import React, {Component} from 'react'
import FlashcardsListScreen from './list/FlashcardsListScreen'
import AddFlashCardScreen from './add/AddFlashCardScreen'
import PractiseScreen from './view/PractiseScreen'

import {StackNavigator} from 'react-navigation'

const BasicApp = StackNavigator({
  List: {screen: FlashcardsListScreen},
  Add: {screen: AddFlashCardScreen},
  View: {screen: PractiseScreen}
}, {
  headerMode: 'screen',
})

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers({flashcards, addFlashCard: addFlashCard.reducer})
const store = createStoreWithMiddleware(reducer)

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
        <BasicApp />
			</Provider>
		)
	}
}
