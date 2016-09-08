import React, { Component } from 'react';
import { styles } from './styles.js';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';


export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }  

  userEvent() {
  //get added events
    
  }

  render() {
    return (
        <View style={styles.textInputContainer}>
          <Text>Your Username: {this.state.username}</Text>
          <Text>list of user's events goes here</Text>        

        </View>
      );
  }
}