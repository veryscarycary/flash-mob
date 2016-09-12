import React, { Component } from 'react';
import { styles } from './styles.js';
import { distance } from './util.js';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image
} from 'react-native';

export class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionHidden: false,
      isComing: false
    };
    this._showDescription = this._showDescription.bind(this);
    this._toggleDescription = this._toggleDescription.bind(this);
    this._toggleIsComing = this._toggleIsComing.bind(this);
  }

  // show description when tapped on
  _toggleDescription() {
    this.setState({
      descriptionHidden: !this.state.descriptionHidden
    });
  }

  // light up events you are going to
  _toggleIsComing() {
    this.setState({
      isComing: !this.state.isComing
    });
  }

  // append description to event on eventlist
  _showDescription() {
    if (this.state.descriptionHidden) {
      return (
        <View>
        <Text style={styles.eventText}>
          {this.props.event.description}
        </Text>
        <TouchableHighlight style={styles.meComing} underlayColor='white' onPress={this._toggleIsComing}>
          <Text style={styles.meComingText}>i am coming!</Text>
        </TouchableHighlight>
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback style={styles.highlight} onPress={this._toggleDescription}>
        <View style={styles.event}>
          <View style={styles.row}>
          {this.state.isComing ? <Image style={styles.imageIcon} source={require('./img/flash-logo-pink-sm-solid.png')} /> : <Image style={styles.imageIcon} source={require('./img/flash-logo-pink-sm.png')} />}
            <Text style={styles.title}>{'  ' + this.props.event.title}</Text>
            <Text style={styles.category}>{this.props.event.category}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.distAndTime}>{
              Math.floor(distance(this.props.latitude, this.props.longitude, this.props.event.latitude, this.props.event.longitude) * 10) / 10
            } miles away @ {
              this.props.event.date.substr(this.props.event.date.indexOf('T') + 1, 5)
            }</Text>
          </View>
          <View style={styles.hidden}>
            {this._showDescription()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}