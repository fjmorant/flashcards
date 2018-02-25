/* @flow */

import {observable, action} from 'mobx'
import shortid from 'shortid'

export default class FlashCard {
    id = shortid.generate()

    @observable name = ''
    @observable meaning = ''
    @observable example = ''
    @observable mastered = false

    name: string
    meaning: string
    example: string
    mastered: boolean

    @action.bound
    changeName(name: string) {
        this.name = name
    }

    @action.bound
    changeMeaning(meaning: string) {
        this.meaning = meaning
    }

    @action.bound
    changeExample(example: string) {
        this.example = example
    }

    @action.bound
    toggleMaster() {
        this.mastered = !this.mastered
    }
}