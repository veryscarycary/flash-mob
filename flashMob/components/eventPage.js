import React, { Component } from 'react';
import { Event } from './event.js';
import { CreateEvent } from './createEvent';
import { styles } from './styles.js';
import {
  StyleSheet,
  Image,
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
      instagramObject: null,
      images: ['no images']
    };

    this.getPhotosFromInstagram = this.getPhotosFromInstagram.bind(this);
  }

  componentWillMount () {
    console.log(this.props.hashtag, "THIS IS THE PASSED IN HASHTAG");
    this.getPhotosFromInstagram(this.props.hashtag);
  }

  filterInstagramData (data, hashtag) {
    var images = [];

    data.forEach(function (image) {
      if (image.caption.text.includes(hashtag)) {
        images.push(image.images.low_resolution.url);
      }
    });

    return images;
  }

  deleteEvent () {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'api/delete');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('Deleted event: ' + xhr.responseText);
      } else {
        alert('Request failed.  Returned status of ' + xhr.status);
      }
    };
    xhr.send();
  }

  getPhotosFromInstagram (hashtag) {
    var context = this;
    var url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + ACCESS_TOKEN;
    console.log('ACCESS_TOKEN.AccessToken', ACCESS_TOKEN);


    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var imageObject = JSON.parse(xhr.responseText);

        context.setState({
          instagramObject: imageObject,
          images: context.filterInstagramData(imageObject.data, hashtag)
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
          <Text style={styles.eventText}>{this.props.hashtag}</Text>
            <Image style={{width: 150, height: 150}} source={{uri: this.state.images[0]}}/>
            <Image style={{width: 150, height: 150}} source={{uri: this.state.images[1]}}/>
            <Image style={{width: 150, height: 150}} source={{uri: this.state.images[2]}}/>
            <Image style={{width: 150, height: 150}} source={{uri: this.state.images[3]}}/>
          </View>

          <Text style={styles.eventText}>{this.props.description}</Text>

          <TouchableHighlight style={styles.deleteEventButton} underlayColor='white' onPress={this.deleteEvent}>
            <Text style={styles.deleteButtonText}>Delete Event</Text>
          </TouchableHighlight>
        </View>
      </View>
      </ScrollView>
    );
  }
}