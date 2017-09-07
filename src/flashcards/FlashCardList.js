/* @flow */

import {observable} from 'mobx'
import FlashCard from './FlashCard'
import FlashCardsRepository from './FlashCardsRepository'

class FlashCardList {
    @observable flashCards = []

    constructor() {
        
    }

    @action add(flashCard: FlashCard) {
        this.flashCards.push(flashCard)
    }
}

export default new FlashCardList()