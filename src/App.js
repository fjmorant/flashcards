import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import flashcards from './list/flashcardsDuck';
import addFlashCard from './add/addFlashCardDuck'
import React, {Component} from 'react'
import FlashcardsListScreen from './list/FlashcardsListScreen'
import AddFlashCardScreen from './add/AddFlashCardScreen'

import {StackNavigator} from 'react-navigation'

const BasicApp = StackNavigator({
  List: {screen: FlashcardsListScreen},
  Add: {screen: AddFlashCardScreen},
});


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers({flashcards, addFlashCard})
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
