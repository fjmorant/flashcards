import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

export default ({
  height,
  value,
  onChangeText,
  placeholder,
  ...props,
}) => (
  <TextInput
    {...props}
    style={[{height, borderColor: 'gray', borderWidth: 1, padding: 5}, props.style]}
    onChangeText={onChangeText}
    placeholder={placeholder}
    value={value}/>
);
