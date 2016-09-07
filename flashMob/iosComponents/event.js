import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighLight
} from 'react-native';

class Event extends Component {
  constructor(props) {
    super(props)
  }

  _goToEvent() {
    this.props.toggleNavBar();
  }

  render() {
    return (
      <View style={styles.event}>
        <View style={styles.row}>
          <Text style={styles.title}>{this.props.event.title}</Text>
          <Text style={styles.category}>{this.props.event.category}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.distAndTime}>{this.props.event.dist} miles away @ {this.props.event.time}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  event: {
    flexDirection: 'column',
    padding: 8,
    margin: 1,
    borderStyle: 'solid',
    shadowRadius: 1,
    shadowColor: '#000000',
    shadowOpacity: .8,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  title: {
    flex: 4
  },
  category: {
    flex: 1
  },
  distAndTime: {
    color: 'grey',
    fontStyle: 'italic'
  },
});

// <TouchableHighLight onPress={this._goToEvent}

module.exports = Event;