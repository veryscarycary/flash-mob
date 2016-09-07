/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

var Events = require('./iosComponents/events.js')

class flashMob extends Component {
  constructor() {
    super()
    this.state = {
      navigationBarHidden: false
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigatorIOS ref="nav"
          itemWrapperStyle={styles.navWrap}
          style={styles.titleBar}
          navigationBarHidden={this.state.navigationBarHidden}
          initialRoute={{
            title: "Events List",
            component: Events
          }}/>
        <View style={styles.bottomBar}>
          <Text style={styles.footer}>Create Event</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navWrap: {
    flex: 1,
  },
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
    flex: 1,
    backgroundColor: 'yellow',
    flexDirection: 'row'
  },
  bottomBar: {
    backgroundColor: '#cccccc',
    marginBottom: 0,
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row'
  },
  footer: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1
  }
});

AppRegistry.registerComponent('flashMob', () => flashMob);


// <View style={styles.titleBar}>
//   <Text style={styles.title}>
//     Events List
//   </Text>
// </View>