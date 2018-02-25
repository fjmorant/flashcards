import 'react-native'
import React from 'react'
import AddFlashCardScreen from './AddFlashCardScreen'
import FlashCard from './FlashCard'

import renderer from 'react-test-renderer'

const flashCardList = {
  list: [new FlashCard()],
  getFlashCard: () => new FlashCard(),
}

describe('AddFlashCardScreen', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <AddFlashCardScreen
            flashCardList={flashCardList}
            navigation={{state: {params: {}}}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
