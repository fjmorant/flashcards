/* @flow */

import {observable, action, computed} from 'mobx'
import FlashCard from './FlashCard'

export default class FlashCardList {
  flashCards: {[string]: FlashCard}
  flashCardRepository: any

  @observable flashCards = new Map<string, FlashCard>()

  constructor(flashCardRepository: any) {
    this.flashCardRepository = flashCardRepository

    this.flashCardRepository.retrieve().then(flashCards => {
      if (flashCards) {
        const keys = Object.keys(flashCards)

        keys.forEach(key => {
          this.flashCards.set(key, flashCards[key])
        })
      }
    })
  }

  @action.bound
  add(flashCard: FlashCard) {
    this.flashCards.set(flashCard.id, flashCard)

    this.flashCardRepository.save(this.flashCards)
  }

  @action.bound
  delete(flashCardId: string) {
    this.flashCards.delete(flashCardId)

    this.flashCardRepository.save(this.flashCards)
  }

  @action.bound
  edit(flashCard: FlashCard) {
    this.flashCards.set(flashCard.id, flashCard)

    this.flashCardRepository.save(this.flashCards)
  }

  getFlashCard = (id: string) => {
    return this.flashCards.get(id)
  }

  @computed
  get list(): Array<FlashCard> {
    if (!this.flashCards) {
      return []
    }

    return this.flashCards.values()
  }
}
