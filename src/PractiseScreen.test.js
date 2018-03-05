import 'react-native'
import React from 'react'
import PractiseScreen from './PractiseScreen'

import renderer from 'react-test-renderer'

describe('PractiseScreen', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<PractiseScreen navigation={{}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
