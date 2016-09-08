/*
This file will eventually migrate to events.js
*/

import React, { Component } from 'react';
import { styles } from './styles.js';
import MapView from 'react-native-maps';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

export class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown'
    };
  }

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //first params on success
        var initialPosition = JSON.stringify(position);
        console.log('initialPosition------->', initialPosition);
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

  getNearByEvents() {
    //invoke when user log in, return event near by events
    fetch('http://localhost:3000/api/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: this.state.lastPosition.coords.latitude,
        longitude: this.state.lastPosition.coords.longitude
      })
    }).then(function(res) {
      //redirect to events home page
    }).catch(function(err) {
      console.log('There is an error. It\'s sad day D=', err);
    });
  }

  //function that checks radius

  render() {
    return (
        <View>
          <MapView/>
        </View>
      );
  }
}