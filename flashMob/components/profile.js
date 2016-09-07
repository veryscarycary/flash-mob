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
      initialPosition: '',
      lastPosition: '',
    };

    this.watchID = null;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var initialPosition = JSON.stringify(position);
      console.log('geo---------->>>>', position);
      this.setState({initialPosition: initialPosition});
    }, function(err) {
      console.log('There is an error. It\'s sad day D=', err);
    },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(function(position) {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
        <View style={styles.textInputContainer}>
          <Text>Your Username: {this.state.username}</Text>
          
          <Text>Your Location: {this.state.lastPosition}</Text>

        </View>
      );
  }
}