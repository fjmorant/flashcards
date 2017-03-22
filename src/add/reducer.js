import immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {
  setFlashCardMastered,
  setFlashCardId,
  setFlashCardName,
  setFlashCardMeaning,
  setFlashCardExample,
  setPickerOptions,
  clearPickerOptions,
  clearFlashCard,
} from './actionCreators'

const defaultState = immutable.fromJS({
  id: null,
  name: '',
  meaning: '',
  example: '',
  pickerOptions: [],
  mastered: false,
})

export default handleActions({
  [setFlashCardMastered]: (state, {payload}) => state.set('mastered', payload),
  [setFlashCardId]: (state, {payload}) => state.set('id', payload),
  [setFlashCardName]: (state, {payload}) => state.set('name', payload),
  [setFlashCardMeaning]: (state, {payload}) => state.set('meaning', payload),
  [setFlashCardExample]: (state, {payload}) => state.set('example', payload),
  [setPickerOptions]: (state, {payload}) => state.set('pickerOptions', payload),
  [clearPickerOptions]: (state) => state.set('pickerOptions', immutable.List()),
  [clearFlashCard]: () => defaultState,
}, defaultState)
