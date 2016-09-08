import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

var Events = require('./events.js')

class EventsPage extends Component {
  constructor(props) {
    super(props)
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
});

module.exports = EventsPage;