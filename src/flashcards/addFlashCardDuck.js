import { createAction, handleActions } from 'redux-actions';
import {fromJS} from 'immutable';
import {addNewFlashCard} from './flashcardsDuck';

export const SET_FLASHCARD_NAME = 'SET_FLASHCARD_NAME';
export const SET_FLASHCARD_MEANING = 'SET_FLASHCARD_MEANING';
export const SET_FLASHCARD_EXAMPLE = 'SET_FLASHCARD_EXAMPLE';
export const CLEAR_FLASHCARD = 'CLEAR_FLASHCARD';

const setFlashCardName = createAction(SET_FLASHCARD_NAME);
const setFlashCardMeaning = createAction(SET_FLASHCARD_MEANING);
const setFlashCardExample = createAction(SET_FLASHCARD_EXAMPLE);
const clearFlashCard = createAction(CLEAR_FLASHCARD);

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

export const saveFlashCard = () => {
  return (dispatch, getState) => {
    dispatch(addNewFlashCard(getState().addFlashCard));
    dispatch(clearFlashCard());
  };
};

const defaultState = fromJS({
  flashCardName: '',
  flashCardMeaning: '',
  flashCardExample: '',
});

export default handleActions({
  [SET_FLASHCARD_NAME]: (state, {payload}) => state.set('flashCardName', payload),
  [SET_FLASHCARD_MEANING]: (state, {payload}) => state.set('flashCardMeaning', payload),
  [SET_FLASHCARD_EXAMPLE]: (state, {payload}) => state.set('flashCardExample', payload),
  [CLEAR_FLASHCARD]: () => defaultState,
}, defaultState);
