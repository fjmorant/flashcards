/* @flow */

import FlashCard from './FlashCard'

interface FlashCardRepository {
    save(flashCards: Array<FlashCard>): void
    list(): void
}

class FlashCardRepositoryAsyncStorage implements FlashCardRepository {
    
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

export default FlashCardRepositoryAsyncStorage()