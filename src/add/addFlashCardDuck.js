import { createAction, handleActions } from 'redux-actions';
import {fromJS} from 'immutable';
import {addNewFlashCard} from '../list/flashcardsDuck';

export const SET_FLASHCARD_NAME = 'SET_FLASHCARD_NAME';
export const SET_FLASHCARD_MEANING = 'SET_FLASHCARD_MEANING';
export const SET_FLASHCARD_EXAMPLE = 'SET_FLASHCARD_EXAMPLE';
export const CLEAR_FLASHCARD = 'CLEAR_FLASHCARD';

export const setFlashCardName = createAction(SET_FLASHCARD_NAME);
export const setFlashCardMeaning = createAction(SET_FLASHCARD_MEANING);
export const setFlashCardExample = createAction(SET_FLASHCARD_EXAMPLE);
export const clearFlashCard = createAction(CLEAR_FLASHCARD);

export const changeFlashCardName = (name) => {
  return (dispatch) => {
      dispatch(setFlashCardName(name));
  };
};
export const changeFlashCardMeaning = (meaning) => {
  return (dispatch) => {
      dispatch(setFlashCardMeaning(meaning));
  };
};
export const changeFlashCardExample = (example) => {
  return (dispatch) => {
      dispatch(setFlashCardExample(example));
  };
};

export const saveFlashCard = (id) => {
  return (dispatch, getState) => {
    dispatch(addNewFlashCard(getState().addFlashCard, id))
    dispatch(clearFlashCard())
  };
};

const defaultState = fromJS({
  name: '',
  meaning: '',
  example: '',
});

export default handleActions({
  [SET_FLASHCARD_NAME]: (state, {payload}) => state.set('name', payload),
  [SET_FLASHCARD_MEANING]: (state, {payload}) => state.set('meaning', payload),
  [SET_FLASHCARD_EXAMPLE]: (state, {payload}) => state.set('example', payload),
  [CLEAR_FLASHCARD]: () => defaultState,
}, defaultState);
