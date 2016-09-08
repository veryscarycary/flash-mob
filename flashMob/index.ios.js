import React, { Component } from 'react';
import { Main } from './components/Main.js';
import Button from 'react-native-button';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';

//testing to use navigatorIOS for testing purposes, but would need to explore how to get user to a different screen without using a stack
const styles = StyleSheet.create({
  navigator: {flex: 1}
});
class flashMob extends Component {

  render() {
    return (
      <NavigatorIOS 
        style={styles.navigator}
        initialRoute={{
          title: 'get started',
          component: Main,
        }}/>
    );      
  }
}


AppRegistry.registerComponent('flashMob', () => flashMob);


