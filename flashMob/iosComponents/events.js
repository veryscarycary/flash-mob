import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

var Event = require('./event.js');
var CreateEvent = require('./createEvent.js');

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.events = [
      {
        title: 'Super fun time',
        category: 'Music',
        dist: .2,
        time: '7:00PM'
      },
      {
        title: 'less fun time',
        category: 'Sports',
        dist: .5,
        time: '4:30PM'
      },
      {
        title: 'inventive title',
        category: 'Random',
        dist: .3,
        time: '12:00AM'
      },
      {
        title: 'Super fun time',
        category: 'Music',
        dist: .2,
        time: '7:00PM'
      },
      {
        title: 'less fun time',
        category: 'Sports',
        dist: .5,
        time: '4:30PM'
      },
      {
        title: 'inventive title',
        category: 'Random',
        dist: .3,
        time: '12:00AM'
      },
      {
        title: 'Super fun time',
        category: 'Music',
        dist: .2,
        time: '7:00PM'
      },
      {
        title: 'less fun time',
        category: 'Sports',
        dist: .5,
        time: '4:30PM'
      },
      {
        title: 'inventive title',
        category: 'Random',
        dist: .3,
        time: '12:00AM'
      },
      {
        title: 'Super fun time',
        category: 'Music',
        dist: .2,
        time: '7:00PM'
      },
      {
        title: 'less fun time',
        category: 'Sports',
        dist: .5,
        time: '4:30PM'
      },
      {
        title: 'inventive title',
        category: 'Random',
        dist: .3,
        time: '12:00AM'
      }
    ];
    
    this.state = {
      dataSource: this.ds.cloneWithRows(this.events)
    }
    this._onForward = this._onForward.bind(this)
  }

  _onForward() {
    this.props.navigator.push({
      component: CreateEvent,
      title: "Create Event"
    })
  }

  // componentWillMount() {
  //   fetch('')
  //     .then((res) => res.json())
  //     .then((resJSON) => this.setState({
  //       events: resJSON
  //     }));
  // }

  render() {
    return (
      <View>
        <View style={styles.events}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Event event={rowData}/>}
          />
        </View>
        <TouchableHighlight style={styles.bottomBar} onPress={this._onForward}> 
          <Text style={styles.footer}>Create Event</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  events: {
    flexDirection: 'row',
    flex: 1
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
})

module.exports = EventsList;