import {createAction} from 'redux-actions'

export const setFlashCardName = createAction('SET_FLASHCARD_NAME')
export const setFlashCardMeaning = createAction('SET_FLASHCARD_MEANING')
export const setFlashCardExample = createAction('SET_FLASHCARD_EXAMPLE')
export const clearFlashCard = createAction('CLEAR_FLASHCARD')
export const setPickerOptions = createAction('SET_PICKER_OPTIONS')
export const clearPickerOptions = createAction('CLEAR_PICKER_OPTIONS')
