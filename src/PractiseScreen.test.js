import 'react-native'
import React from 'react'
import PractiseScreen from './PractiseScreen'
import FlashCard from './FlashCard'

import renderer from 'react-test-renderer'

const flashCardList = {
  list: [new FlashCard()],
}

describe('PractiseScreen', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<PractiseScreen flashCardList={flashCardList} navigation={{}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
