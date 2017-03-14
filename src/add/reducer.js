import immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {
  setFlashCardName,
  setFlashCardMeaning,
  setFlashCardExample,
  setPickerOptions,
  clearPickerOptions,
  clearFlashCard,
} from './actionCreators'

const defaultState = immutable.fromJS({
  name: '',
  meaning: '',
  example: '',
  pickerOptions: [],
})

export default handleActions({
  [setFlashCardName]: (state, {payload}) => state.set('name', payload),
  [setFlashCardMeaning]: (state, {payload}) => state.set('meaning', payload),
  [setFlashCardExample]: (state, {payload}) => state.set('example', payload),
  [setPickerOptions]: (state, {payload}) => state.set('pickerOptions', payload),
  [clearPickerOptions]: (state) => state.set('pickerOptions', immutable.List()),
  [clearFlashCard]: () => defaultState,
}, defaultState)
