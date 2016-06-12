/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Container, Header, Content, Footer, Title} from 'native-base';

class FlashCards extends Component {
  render() {
    return (
      <Container>
        <Header>
            <Title>Header</Title>
        </Header>

        <Content>
              <Text>
                Hello Wooooorld
              </Text>
        </Content>

        <Footer>
            <Title>Footer</Title>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FlashCards', () => FlashCards);
