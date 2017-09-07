/* @flow */

import {observable, action} from 'mobx'

export default class FlashCard {
    @observable name = ''
    @observable meaning = ''
    @observable example = ''
    @observable mastered = false

    name: string
    meaning: string
    example: string
    mastered: boolean

    @action
    changeName(name) {
        this.name = name
    }

    @action
    changeMeaning(meaning) {
        this.meaning = meaning
    }

    @action
    changeExample(example) {
        this.example = example
    }

    @action
    toggleMaster() {
        this.mastered = !this.mastered
    }
}