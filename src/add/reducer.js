import immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {
  setFlashCardName,
  setFlashCardMeaning,
  setFlashCardExample,
  clearFlashCard,
} from './actionCreators'

const defaultState = immutable.fromJS({
  name: '',
  meaning: '',
  example: '',
})

export default handleActions({
  [setFlashCardName]: (state, {payload}) => state.set('name', payload),
  [setFlashCardMeaning]: (state, {payload}) => state.set('meaning', payload),
  [setFlashCardExample]: (state, {payload}) => state.set('example', payload),
  [clearFlashCard]: () => defaultState,
}, defaultState)
