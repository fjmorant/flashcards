import 'react-native'
import React from 'react'
import {FlashcardsListScreen} from './FlashcardsListScreen'

import renderer from 'react-test-renderer'

jest.mock('react-dom/server', () => {}, {virtual: true})

describe('FlashcardsListScreen', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<FlashcardsListScreen data={{loading: true}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
