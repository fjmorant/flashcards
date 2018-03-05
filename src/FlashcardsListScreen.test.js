import 'react-native'
import React from 'react'
import FlashcardsListScreen from './FlashcardsListScreen'

import renderer from 'react-test-renderer'

const flashCardList = {
  list: [new FlashCard()],
}

describe('FlashcardsListScreen', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<FlashcardsListScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
