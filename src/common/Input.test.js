import 'react-native'
import React from 'react'
import Input from './Input'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<Input />).toJSON()
  expect(tree).toMatchSnapshot()
})
