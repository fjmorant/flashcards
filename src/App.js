import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import thunk from 'redux-thunk';
import flashcards from './flashcards/flashcardsDuck';
import addFlashCard from './flashcards/addFlashCardDuck';
import { registerScreens } from './screens';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({flashcards, addFlashCard});
const store = createStoreWithMiddleware(reducer);

export default () => {
  registerScreens(store, Provider);

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'com.flashcards.MainScreen',
      title: 'FlashCards',
    },
    animationType: 'slide-down'
  });
};
