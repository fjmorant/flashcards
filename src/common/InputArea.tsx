import * as React from 'react'
import {StyleSheet, TextInput, ViewStyle} from 'react-native'

const styles = StyleSheet.create({
  text: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
})

export interface IProps {
  value: string
  placeholder: string
  style: ViewStyle
  onChangeText: (text: string) => void
}

export default class InputArea extends React.Component<IProps> {
  public render() {
    const {value, onChangeText, placeholder, ...props} = this.props

    return (
      <TextInput
        {...props}
        multiline
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType="next"
        style={[styles.text, props.style]}
        value={value}
      />
    )
  }
}
