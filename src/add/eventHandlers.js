import {
  setFlashCardName,
  setFlashCardMeaning,
  setFlashCardExample,
  clearFlashCard,
} from './actionCreators'

import {addNewFlashCard} from '../list/flashcardsDuck'
import request from 'superagent'

export const changeFlashCardName = (name) => (dispatch) => dispatch(setFlashCardName(name))
export const changeFlashCardMeaning = (meaning) => (dispatch) => dispatch(setFlashCardMeaning(meaning))
export const changeFlashCardExample = (example) => (dispatch) => dispatch(setFlashCardExample(example))

export const saveFlashCard = (id) => {
  return (dispatch, getState) => {
    dispatch(addNewFlashCard(getState().addFlashCard, id))
    dispatch(clearFlashCard())
  }
}

export const onFindButtonPressed = () => async(dispatch, getState) => {
  const name = getState().addFlashCard.get('name')

  if (name) {
    request
    .get(`https://owlbot.info/api/v1/dictionary/${name.toLowerCase()}`)
    .query({format: 'json'})
    .end((error, response) => {
      const entryDictionary = response.body[0]

      dispatch(setFlashCardMeaning(entryDictionary.defenition))
      dispatch(setFlashCardExample(entryDictionary.example))
    })
  }
}
