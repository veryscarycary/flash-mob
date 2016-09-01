/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class flashMob extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Flash!
        </Text>
        <Text style={styles.instructions}>
          Entertainment in a whim!
        </Text>
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#40e0d0'}}
          style={{fontSize: 20, color: 'white'}}>
          Log in
        </Button>
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#40e0d0'}}
          style={{fontSize: 20, color: 'white'}}>
          Sign up
        </Button>
      </View>
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

AppRegistry.registerComponent('flashMob', () => flashMob);
