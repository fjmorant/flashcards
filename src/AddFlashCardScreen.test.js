import 'react-native'
import React from 'react'
import AddFlashCardScreen from './AddFlashCardScreen'

import renderer from 'react-test-renderer'

describe('AddFlashCardScreen', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<AddFlashCardScreen navigation={{state: {params: {}}}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
