import React, { Component } from 'react';
import { CreateEvent } from './createEvent.js';
import MapView from 'react-native-maps';
import { styles } from './styles.js';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      region: {
        latitude: 38.4429984,
        longitude: -122.6925904,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markers: []
    }
    this._onForward = this._onForward.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  watchID: ?number = null;

  componentWillMount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/markers')
      .then((res) => res.json())
      .then((resJSON) => {
        console.log(resJSON);
        this.setState({
          markers: resJSON
        })
      }
    );
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        console.log(initialPosition);
        this.setState({initialPosition});
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      var parsedPosition = JSON.parse(lastPosition);
      this.setState({lastPosition});
      this.setState({
        region: {
          latitude: parsedPosition.coords.latitude,
          longitude: parsedPosition.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      })
    });
  }

  onRegionChange(region) {
    this.setState({region});
  }
  _onForward() {
    this.props.navigator.push({
      component: CreateEvent,
      title: 'Create Event'
    });
  }

  render() {
    return (
      <View style={localStyles.map}>
        <MapView
          style={localStyles.mapLayout}
          region={this.state.region}
          showsUserLocation={true}
          onRegionChange={this.onRegionChange}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <TouchableHighlight style={[styles.button, styles.newButton, localStyles.button]} underlayColor='white' onPress={this._onForward}> 
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 65,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    flex: 1
  },
  mapLayout: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    backgroundColor: 'white'
  }
})