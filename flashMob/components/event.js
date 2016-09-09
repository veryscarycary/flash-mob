import React, { Component } from 'react';
import { styles } from './styles.js';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableWithoutFeedback,
  TouchableHighlight
} from 'react-native';

export class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionHidden: false,
      userList: []
    };
    this._showDescription = this._showDescription.bind(this);
    this._toggleDescription = this._toggleDescription.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  _toggleDescription() {
    this.setState({
      descriptionHidden: !this.state.descriptionHidden
    });
  }

  _showDescription() {
    if (this.state.descriptionHidden) {
      return (
        <View>
        <Text style={styles.eventText}>
          {this.props.event.description}
        </Text>
        <TouchableHighlight style={styles.meComing} underlayColor='white' onPress={this.addToList}>
          <Text style={styles.meComingText}>i am coming!</Text>
        </TouchableHighlight>
        </View>
      );
    } else {
      return null;
    }
  }

  addToList() {
    //eventually add events to db
    this.state.userList.push(this.props.event);
    //does not work at the moment, userList array gets over wrtten each time
    //console.log('current user list---->', this.state.userList);
  }

  render() {
    return (
      <TouchableWithoutFeedback style={styles.highlight} onPress={this._toggleDescription}>
        <View style={styles.event}>
          <View style={styles.row}>
            <Text style={styles.title}>{this.props.event.title}</Text>
            <Text style={styles.category}>{this.props.event.category}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.distAndTime}>{this.props.event.dist} miles away @ {this.props.event.time}</Text>
          </View>
          <View style={styles.hidden}>
            {this._showDescription()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// const styles = StyleSheet.create({
//   highlight: {
//     flex: 1,
//   },
//   event: {
//     flexDirection: 'column',
//     padding: 8,
//     margin: 1,
//     borderStyle: 'solid',
//     shadowRadius: 1,
//     shadowColor: '#000000',
//     shadowOpacity: .8,
//     shadowOffset: {
//       height: 1,
//       width: 0
//     }
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'stretch'
//   },
//   title: {
//     flex: 4
//   },
//   category: {
//     flex: 1
//   },
//   distAndTime: {
//     color: 'grey',
//     fontStyle: 'italic'
//   },
// });

// <TouchableHighLight onPress={this._goToEvent}