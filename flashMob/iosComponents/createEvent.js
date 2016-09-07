import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class flashMob extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>
            Make an Event
          </Text>
        </View>
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
  title: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  titleBar: {
    backgroundColor: 'yellow',
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row'
  }
});