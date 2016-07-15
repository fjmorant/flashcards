import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Input from './common/Input';
import InputArea from './common/InputArea';

class AddFlashCardScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Input
            style={{margin: 8}}
            height={35}
            placeholder='Type word you want to remember'
            value=''/>
        <InputArea
            style={{margin: 8}}
            placeholder='Explanation of the word'
            value=''/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(245, 252, 255)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'rgb(51, 51, 51)',
    marginBottom: 5,
  },
});

export default AddFlashCardScreen;
