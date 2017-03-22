import {
  addNewFlashCard,
  masterFlashCard,
  unmasteredFlashCard,
} from '../list/flashcardsDuck'
import request from 'superagent'
import immutable from 'immutable'
import {Alert} from 'react-native'

import {
  setFlashCardMastered,
  setFlashCardName,
  setFlashCardMeaning,
  setFlashCardExample,
  setFlashCardId,
  clearFlashCard,
  setPickerOptions,
  clearPickerOptions,
} from './actionCreators'

export const changeFlashCardMastered = (mastered) => (dispatch) => dispatch(setFlashCardMastered(mastered))
export const changeFlashCardId = (id) => (dispatch) => dispatch(setFlashCardId(id))
export const changeFlashCardName = (name) => (dispatch) => dispatch(setFlashCardName(name))
export const changeFlashCardMeaning = (meaning) => (dispatch) => dispatch(setFlashCardMeaning(meaning))
export const changeFlashCardExample = (example) => (dispatch) => dispatch(setFlashCardExample(example))

export const saveFlashCard = (id) => {
  return (dispatch, getState) => {
    dispatch(addNewFlashCard(getState().addFlashCard))
    dispatch(clearFlashCard())
  }
}

export const onSearchEntryTriggered = (onOpenModalPicker) => async(dispatch, getState) => {
  const name = getState().addFlashCard.get('name').toLowerCase()

  if (name) {
    request
    .get(`https://wordsapiv1.p.mashape.com/words/${name}`)
    .set('X-Mashape-Key', 'VQa8Eayg2Kmsh0nklI2QUhfltYkvp19WrI8jsnxrvGVatb8Lf8')
    .set('Accept', 'application/json')
    .end((error, response) => {
      if (error) {
        Alert.alert(error.message)
        return
      }

      if (response.body.results.length === 1) {
        const entryDictionary = response.body.results[0]
        dispatch(setFlashCardMeaning(entryDictionary.definition))
        if (entryDictionary.examples && entryDictionary.examples[0]) {
          dispatch(setFlashCardExample(entryDictionary.examples[0]))
        }
      } else {
        dispatch(setPickerOptions(immutable.fromJS(response.body.results)))
        onOpenModalPicker()
      }
    })
  }
}

export const onSelectMeaningOption = (key) => (dispatch, getState) => {
  const pickerOptions = getState().addFlashCard.get('pickerOptions')
  const entryDictionary = pickerOptions.get(key)

  dispatch(setFlashCardMeaning(entryDictionary.get('definition')))
  if (entryDictionary.has('examples') && entryDictionary.getIn(['examples', 0])) {
    dispatch(setFlashCardExample(entryDictionary.getIn(['examples', 0])))
  }
  dispatch(clearPickerOptions())
}
