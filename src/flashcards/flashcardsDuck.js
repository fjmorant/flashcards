import { createAction, handleActions } from 'redux-actions';

const addFlashCard = createAction('ADD_FLASH_CARD');

export default handleActions({
  ['ADD_FLASH_CARD']: (state, action) => state.flashcards.push({name: 'newFlashCard'})
}, {
  flashcards: []
});
