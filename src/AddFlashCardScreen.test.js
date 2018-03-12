import 'react-native'
import React from 'react'
import {AddFlashCardScreen} from './AddFlashCardScreen'

import renderer from 'react-test-renderer'

jest.mock('react-dom/server', () => {}, {virtual: true})

describe('AddFlashCardScreen', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <AddFlashCardScreen
            data={{loading: false}}
            navigation={{state: {params: {}}}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
