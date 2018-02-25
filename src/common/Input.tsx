import * as React from 'react'
import {TextInput} from 'react-native'

export interface IIProps {
  height: number
  value: string
  style: any
  placeholder: string
  onChangeText(text: string): void
}

export default class Input extends React.Component<IIProps> {
  public render() {
    const {height, value, onChangeText, placeholder, ...props} = this.props

    return (
      <TextInput
        {...props}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[
          {height, borderColor: 'gray', borderWidth: 1, padding: 5},
          props.style,
        ]}
        value={value}
      />
    )
  }
}
