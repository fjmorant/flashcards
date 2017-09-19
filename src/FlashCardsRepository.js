/* @flow */

import FlashCard from './FlashCard'
import {AsyncStorage} from 'react-native'

interface FlashCardRepository {
    save(flashCards: Array<FlashCard>): void,
    retrieve(): Array<FlashCard>,
    delete(flashCardId: string): void
}

export default class FlashCardRepositoryAsyncStorage implements FlashCardRepository {
    
    async save(flashCards: Array<FlashCard>) {
        try {
            await AsyncStorage.setItem('flashcards', JSON.stringify(flashCards))
        } catch(error) {
            console.log(error)
        }
    }

    async retrieve() {
        try {
            const flashcards = await AsyncStorage.getItem('flashcards')

            return JSON.parse(flashcards)
        } catch(error) {
            console.log(error)

            return []
        }
    }
}
