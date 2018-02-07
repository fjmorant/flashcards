import 'react-native'
import React from 'react'
import Button from './Button'

import renderer from 'react-test-renderer'

describe('Button', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<Button onPress={() => {}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders without onPress', () => {
    const tree = renderer.create(<Button />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('disabled', () => {
    const tree = renderer.create(<Button disabled />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
