import 'react-native'
import React from 'react'
import InputArea from './InputArea'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<InputArea />).toJSON()
  expect(tree).toMatchSnapshot()
})
