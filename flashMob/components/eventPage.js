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
const ACCESS_TOKEN = require('./InstagramInfo');

export class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instagramObject: null
    };

    this.getPhotosFromInstagram = this.getPhotosFromInstagram.bind(this);
  }

  componentWillMount () {
    this.getPhotosFromInstagram();
  }

  getPhotosFromInstagram () {
    var context = this;
    var url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=3939505238.26c62f3.052108e4465c423d9ab85bb2f3bd1b91';
    console.log('ACCESS_TOKEN.AccessToken', ACCESS_TOKEN.AccessToken);


    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        alert('The data back is ' + xhr.responseText);
        context.setState({
          instagramObject: xhr.responseText
        });
      } else {
        alert('Request failed.  Returned status of ' + xhr.status);
      }
    };
    xhr.send();
  }

  render () {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.eventInputs}>
          <Text style={styles.eventText}>{this.props.title}</Text>
          <Text style={styles.eventText}>{this.props.category}</Text>
          <Text style={styles.eventText}>{this.props.location}</Text>
          <Text style={styles.eventText}>{this.props.time + ', ' + this.props.date}</Text>
          <View>
            <Text style={styles.eventText}>{this.props.invites}</Text>
          </View>

          <View>
            <Text style={styles.eventText}>{this.state.instagramObject}</Text>
          </View>

          <Text style={styles.eventText}>{this.props.description}</Text>
        </View>
      </View>
      </ScrollView>
    );
  }
}