import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class mapView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.map}>
        <Text>map</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flexDirection: 'row',
    flex: 1
  }
})

module.exports = mapView;