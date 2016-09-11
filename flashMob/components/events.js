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
  RefreshControl
} from 'react-native';

export class EventsList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
      refreshing: false,
      dataSource: this.ds.cloneWithRows([]),
      initialPosition: 'unknown',
      lastPosition: 'unknown'
    };
    this._onForward = this._onForward.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
  }

  watchID: ?number = null;

  _onForward() {
    this.props.navigator.push({
      component: CreateEvent,
      title: 'Create Event'
    });
  }

  _onRefresh() {
    this.setState({
      refreshing: true
    });
    fetch('http://localhost:3000/api/events')
      .then((res) => res.json())
      .then((resJSON) => {
        this.setState({
          dataSource: this.ds.cloneWithRows(resJSON)
        });
        this.setState({
          refreshing: false
        });
      });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });

    console.log(this.state.initialPosition)

    fetch('http://localhost:3000/api/events')
      .then((res) => res.json())
      .then((resJSON) => this.setState({
        dataSource: this.ds.cloneWithRows(resJSON)
      })
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  renderSectionHeader() {
    return (
      <View style={styles.row}>
        <Text style={styles.greeting}>HI {this.props.username.toUpperCase()} !</Text>
      </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.events}>
          <ListView
            renderSectionHeader={this.renderSectionHeader}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Event event={rowData}/>}
          />
        </View>
        <TouchableHighlight style={[styles.button, styles.newButton]} underlayColor='white' onPress={this._onForward}> 
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

// const styles1 = StyleSheet.create({
//   wrapper: {
//     flex: 1
//   },
//   events: {
//     marginTop: 70,
//     flexDirection: 'row',
//     flex: 1
//   },
//   bottomBar: {
//     backgroundColor: '#cccccc',
//     marginBottom: 0,
//     paddingBottom: 10,
//     paddingTop: 10,
//     flexDirection: 'row'
//   },
//   footer: {
//     fontSize: 20,
//     textAlign: 'center',
//     flex: 1
//   }
// });
