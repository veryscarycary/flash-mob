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
  RefreshControl,
  ScrollView
} from 'react-native';

export class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // this._showDescription = this._showDescription.bind(this);
    // this._toggleDescription = this._toggleDescription.bind(this);
    console.log("eventPageprops", this.props);
  }

  render () {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.eventInputs}>
          <Text style={styles.eventText}>Title</Text>
          <Text style={styles.eventText}>props > Event Title</Text>
          <Text style={styles.eventText}>props > Category</Text>
          <Text style={styles.eventText}>props > Address</Text>
          <Text style={styles.eventText}>props > Time and Date</Text>

          <View>
            <Text style={styles.eventText}>props > Friends that are invited</Text>
          </View>

          <View>
            <Text style={styles.eventText}> Intagram photo container</Text>
          </View>

          <Text style={styles.eventText}>Event Description</Text>
          <Text style={styles.eventText}>More Information</Text>
        </View>
      </View>
      </ScrollView>
    );
  }
}