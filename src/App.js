import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import flashcards from './flashcards/flashcardsDuck';
import addFlashCard from './flashcards/addFlashCardDuck'
import React, {Component} from 'react'
import MainScreen from './MainScreen'
import AddFlashCardScreen from './AddFlashCardScreen'

import {StackNavigator} from 'react-navigation'

const BasicApp = StackNavigator({
  Main: {screen: MainScreen},
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
