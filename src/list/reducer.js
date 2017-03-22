import {handleActions} from 'redux-actions'
import {Map} from 'immutable'
import shortid from 'shortid'

import {
  loadFlashCards,
  editFlashCard,
  addFlashCard,
  deleteFlashCard,
  masterFlashCard,
  unmasterFlashCard,
} from './actionCreators'

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
