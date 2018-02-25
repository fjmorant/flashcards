/* @flow */
/* global module */

module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^[./a-zA-Z0-9$_-]+\\.(bmp|gif|jpg|jpeg|png|psd|svg|webp)$':
      'RelativeImageStub',
    '^React$': '<rootDir>/node_modules/react',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules/react-native/Libraries/react-native/',
    '<rootDir>/node_modules/react-native/packager/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@rnfdigital/*|react-native|react-navigation|mobx-react|react-clone-referenced-element)',
  ],
  setupFiles: ['<rootDir>/node_modules/react-native/jest/setup.js'],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  globals: {
    'ts-jest': {
      useBabelrc: true,
    },
  },
  testEnvironment: 'node',
  coverageDirectory: './coverage/',
  collectCoverage: true,
}
