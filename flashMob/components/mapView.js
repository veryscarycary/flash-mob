import React, { Component } from 'react';
import { styles } from './styles.js';
import { MapView } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export class mapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: '',
      longitude: ''    
    };
    this.getCoordsByAddress = this.getCoordsByAddress.bind(this);
  }

  getCoordsByAddress() {
    //API call to google to get coords when user input is an address
    var address = this.props.address.replace(' ', '+');
    var key = 'AIzaSyCrkf6vpb_McrZE8p4jg4oUH-oqyGwFdUo';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log('google coords fetch--->>>', res);
      return res.json();   
    }).then((resJson) => {
      this.setState({latitude: resJson.results[0].geometry.location.lat});
      this.setState({longitude: resJson.results[0].geometry.location.lng});
      console.log(this.state.latitude, this.state.longitude);
    }).catch((err) => {
      console.log('There is an error. It\'s sad day D=', err.status, err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <MapView style={styles1.map} region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
      />
      <TouchableHighlight style={[styles.button, styles.newButton, styles.signupButton]} underlayColor='white' onPress={this.getCoordsByAddress}>
              <Text style={styles.buttonText}>TEST</Text>
      </TouchableHighlight>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  map: {
    flexDirection: 'row',
    flex: 1,
    height: 200, 
    margin: 40
  }
});

//module.exports = mapView;