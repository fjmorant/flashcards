import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  }
});

export default ({
  value,
  onChangeText,
  placeholder,
  ...props,
}) => (
  <TextInput
    {...props}
    multiline
    style={[styles.text, props.style]}
    onChangeText={onChangeText}
    placeholder={placeholder}
    value={value}/>
);
