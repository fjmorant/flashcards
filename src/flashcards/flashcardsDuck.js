import { createAction, handleActions } from 'redux-actions';
import {fromJS} from 'immutable';

const ADD_FLASH_CARD = 'ADD_FLASH_CARD';

const addFlashCard = createAction(ADD_FLASH_CARD);

export const addNewFlashCard = (flashcard) => {
  return (dispatch) => {
    dispatch(addFlashCard(flashcard));
  };
};

export default handleActions({
  [ADD_FLASH_CARD]: (state, {payload}) => {
    console.log('Previous State: ', state.toJS());
    const newState = state.set('flashcards', state.get('flashcards').push(payload));
    console.log('New State: ', newState.toJS());
    return newState;
  },
}, fromJS({
  flashcards: []
}));
