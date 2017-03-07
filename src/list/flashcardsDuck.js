import { createAction, handleActions } from 'redux-actions';
import {List, Map, fromJS} from 'immutable'
import {AsyncStorage} from 'react-native'
import shortid from 'shortid'

export const addFlashCard = createAction('ADD_FLASH_CARD');
export const loadFlashCards = createAction('LOAD_FLASH_CARDS');
export const deleteFlashCard = createAction('DELETE_FLASH_CARD');
export const editFlashCard = createAction('EDIT_FLASH_CARD');

const saveFlashCards = (flashcards) => {
    AsyncStorage.setItem('flashcards', JSON.stringify(flashcards.toArray()));
};

export const loadFlashCardsFromPersistance = () => {
  return (dispatch) => {
      AsyncStorage.getItem('flashcards').then((flashcards = '') => {
        dispatch(loadFlashCards(fromJS(JSON.parse(flashcards))))
      }).catch((error) => console.log(error));
  };
};

export const addNewFlashCard = (flashcard, id) => {
  return (dispatch, getState) => {
    if(id) {
      dispatch(editFlashCard(flashcard.set('id', id)))
    } else {
      dispatch(addFlashCard(flashcard))
    }

    saveFlashCards(getState().flashcards.get('flashcards'))
  }
}

const handleAddFlashCard = (state, {payload}) => {
  const flashCardId = shortid.generate()
  const list = state.get('flashcards') || List()

  return state.set('flashcards', list.push(payload.set('id', flashCardId)))
}
const handleDeleteFlashCard = (state, {payload}) => {
  const newFlashCards = state.get('flashcards').filter((flashcard) => flashcard.get('id') !== payload)

  return state.set('flashcards', newFlashCards)
}

const handleEditFlashCard = (state, {payload}) => {
  const index = state.get('flashcards').indexOf(payload)
  const newFlashCards = state.get('flashcards').update(index, () => payload)

  return state.set('flashcards', newFlashCards)
}

export default handleActions({
  [addFlashCard]: handleAddFlashCard,
  [loadFlashCards]: (state, {payload}) => state.set('flashcards', payload),
  [deleteFlashCard]: handleDeleteFlashCard,
  [editFlashCard]: handleEditFlashCard,
}, Map({
  flashcards: List([])
}));
