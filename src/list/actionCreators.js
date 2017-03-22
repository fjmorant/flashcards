import {createAction} from 'redux-actions'

export const addFlashCard = createAction('ADD_FLASH_CARD')
export const loadFlashCards = createAction('LOAD_FLASH_CARDS')
export const deleteFlashCard = createAction('DELETE_FLASH_CARD')
export const editFlashCard = createAction('EDIT_FLASH_CARD')
export const masterFlashCard = createAction('MASTER_FLASH_CARD')
export const unmasterFlashCard = createAction('UNMASTER_FLASH_CARD')
