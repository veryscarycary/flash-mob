import React, { Component } from 'react';
import { styles } from './styles.js';
//import Request from 'request';
var Request = require('request');
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export class mapView extends Component {
  constructor(props) {
    super(props);
  }

  getCoordsByAddress() {
    //API call to google to get coords when user input is an address
    //var address = '';
    //var key = 'AIzaSyCrkf6vpb_McrZE8p4jg4oUH-oqyGwFdUo';
    // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCrkf6vpb_McrZE8p4jg4oUH-oqyGwFdUo', {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    // })
    //   .then((res) => {
    //     console.log('google coords fetch--->>>', res);
    //     res.text();
    //   }).then((resData) => {
    //     console.log('query----->', resData);
    //   }).catch((err) => {
    //     console.log('There is an error. It\'s sad day D=', err.status, err);
    //   });
    // Request.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCrkf6vpb_McrZE8p4jg4oUH-oqyGwFdUo', function(err, res, body) {
    //   if (!err && res.statusCode === 200) {
    //     console.log(body);
    //   } 
    // });
  }

  render() {
    return (
      <View style={styles.container}>
      <TouchableHighlight style={[styles.button, styles.newButton, styles.signupButton]} underlayColor='white' onPress={this.getCoordsByAddress}>
              <Text style={styles.buttonText}>TEST</Text>
      </TouchableHighlight>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   map: {
//     flexDirection: 'row',
//     flex: 1
//   }
// })

//module.exports = mapView;