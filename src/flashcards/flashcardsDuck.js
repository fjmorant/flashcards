import { createAction, handleActions } from 'redux-actions';
import {Stack, Map, fromJS} from 'immutable'
import {AsyncStorage} from 'react-native'
import shortid from 'shortid'

export const addFlashCard = createAction('ADD_FLASH_CARD');
export const loadFlashCards = createAction('LOAD_FLASH_CARDS');
export const deleteFlashCard = createAction('DELETE_FLASH_CARD');

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
    dispatch(addFlashCard(flashcard))
    saveFlashCards(getState().flashcards.get('flashcards'))
  }
}

const handleAddFlashCard = (state, {payload}) => {
  const flashCardId = shortid.generate()

  return state.set('flashcards', state.get('flashcards').push(payload.set('id', flashCardId)))
}
const handleDeleteFlashCard = (state, {payload}) => {
  const newFlashCards = state.get('flashcards').filter((flashcard) => flashcard.get('id') !== payload)

  return state.set('flashcards', newFlashCards)
}

export default handleActions({
  [addFlashCard]: handleAddFlashCard,
  [loadFlashCards]: (state, {payload}) => state.set('flashcards', payload),
  [deleteFlashCard]: handleDeleteFlashCard
}, Map({
  flashcards: Stack([])
}));
