import {createAction, handleActions} from 'redux-actions';
import {Map, fromJS} from 'immutable'
import {AsyncStorage} from 'react-native'
import shortid from 'shortid'

export const addFlashCard = createAction('ADD_FLASH_CARD')
export const loadFlashCards = createAction('LOAD_FLASH_CARDS')
export const deleteFlashCard = createAction('DELETE_FLASH_CARD')
export const editFlashCard = createAction('EDIT_FLASH_CARD')
export const masterFlashCard = createAction('MASTER_FLASH_CARD')
export const unmasterFlashCard = createAction('UNMASTER_FLASH_CARD')

const saveFlashCards = (flashcards) => {
    AsyncStorage.setItem('flashcards', JSON.stringify(flashcards))
};

export const loadFlashCardsFromPersistance = () => {
  return (dispatch) => {
      AsyncStorage.getItem('flashcards').then((flashcards) => {
        if (!flashcards) {
          dispatch(loadFlashCards(Map()))
        } else {
          dispatch(loadFlashCards(fromJS(JSON.parse(flashcards))))
        }
      }).catch((error) => console.log(error));
  };
};

export const addNewFlashCard = (flashcard) => {
  return (dispatch, getState) => {
    if (flashcard.get('id')) {
      dispatch(editFlashCard(flashcard))
    } else {
      dispatch(addFlashCard(flashcard))
    }

    saveFlashCards(getState().flashcards.get('flashcards'))
  }
}

const handleAddFlashCard = (state, {payload}) => {
  const flashCardId = shortid.generate()

  return state.setIn(['flashcards', flashCardId], payload.set('id', flashCardId))
}
const handleDeleteFlashCard = (state, {payload}) => {
  const newFlashCards = state.get('flashcards').filter((flashcard) => flashcard.get('id') !== payload)

  return state.set('flashcards', newFlashCards)
}

const handleEditFlashCard = (state, {payload}) => {
  return state.updateIn(['flashcards', payload.get('id')], () => payload)
}

export default handleActions({
  [addFlashCard]: handleAddFlashCard,
  [loadFlashCards]: (state, {payload}) => state.set('flashcards', payload),
  [deleteFlashCard]: handleDeleteFlashCard,
  [editFlashCard]: handleEditFlashCard,
  [masterFlashCard]: (state, payload) => state.setIn(['flashcards', payload, 'mastered'], true),
  [unmasterFlashCard]: (state, payload) => state.setIn(['flashcards', payload, 'mastered'], false)
}, Map({
  flashcards: Map()
}))
