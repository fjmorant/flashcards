import 'react-native'
import React from 'react'
import Button from './Button'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toMatchSnapshot()
})
