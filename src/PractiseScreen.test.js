import 'react-native'
import React from 'react'
import {PractiseScreen} from './PractiseScreen'

import renderer from 'react-test-renderer'

jest.mock('react-dom/server', () => {}, {virtual: true})

describe('PractiseScreen', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<PractiseScreen data={{loading: true}} navigation={{}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
