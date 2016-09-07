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
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  }
  
   watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //first params on success
        var initialPosition = JSON.stringify(position);
        console.log('geo---------->>>>', position);
        console.log('THIS------->', this);
        this.setState({initialPosition});
      }, 
      //second params on error
      (err) => console.log('There is an error. It\'s a sad day D=', err),
      //optional param
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var lastPosition = JSON.stringify(position);
        this.setState({lastPosition});
        console.log(this.state.lastPosition);
      });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  storeLocation(lat, lon) {
    this.setState({
      initialPositionLatitude: lat, 
      initialPositionLongitude: lon
    });
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