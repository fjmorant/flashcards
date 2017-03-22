import {Map, fromJS} from 'immutable'
import {AsyncStorage} from 'react-native'

import {
  loadFlashCards,
  editFlashCard,
  addFlashCard,
} from './actionCreators'

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
