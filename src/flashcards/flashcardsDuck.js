import { createAction, handleActions } from 'redux-actions';
import {Stack, Map, fromJS} from 'immutable';
import {AsyncStorage} from 'react-native';

const ADD_FLASH_CARD = 'ADD_FLASH_CARD';
const LOAD_FLASH_CARDS = 'LOAD_FLASH_CARDS';

const addFlashCard = createAction(ADD_FLASH_CARD);
const loadFlashCards = createAction(LOAD_FLASH_CARDS);

const saveFlashCards = (flashcards) => {
    AsyncStorage.setItem('flashcards', JSON.stringify(flashcards.toArray()));
};

export const loadFlashCardsFromPersistance = () => {
  return (dispatch) => {
      AsyncStorage.getItem('flashcards').then((flashcards = '') => {
        dispatch(loadFlashCards(Stack(fromJS(JSON.parse(flashcards)))))
      }).catch((error) => console.log(error));
  };
};

export const addNewFlashCard = (flashcard) => {
  return (dispatch, getState) => {
    dispatch(addFlashCard(flashcard));
    saveFlashCards(getState().flashcards.get('flashcards'));
  };
};

export default handleActions({
  [ADD_FLASH_CARD]: (state, {payload}) => state.set('flashcards', state.get('flashcards').push(payload)),
  [LOAD_FLASH_CARDS]: (state, {payload}) => state.set('flashcards', payload),
}, Map({
  flashcards: Stack([])
}));
