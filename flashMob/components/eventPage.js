import React, { Component } from 'react';
import { Event } from './event.js';
import { CreateEvent } from './createEvent';
import { styles } from './styles.js';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ScrollView,
  RefreshControl
} from 'react-native';

export class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <ScrollView>
      <View style={styles.container}>
      <Image style={styles.imageEventPage}
        source={{uri: 'http://www.businessofpt.com/wp-content/uploads/2015/08/free-birthday-meals.jpg'}}
      />
        <View style={styles.eventInputs}>
          <Text style={styles.eventText}>{this.props.title}</Text>
          <Text style={styles.eventText}>{this.props.category}</Text>
          <Text style={styles.eventText}>{this.props.location}</Text>
          <Text style={styles.eventText}>{this.props.time + ', ' + this.props.date}</Text>
          <View>
            <Text style={styles.eventText}>{this.props.invites}</Text>
          </View>

          <View>
            <Text style={styles.eventText}> Instagram photo container</Text>
          </View>

          <Text style={styles.eventText}>{this.props.description}</Text>
        </View>
      </View>
      </ScrollView>
    );
  }
}