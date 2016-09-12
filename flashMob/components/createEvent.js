import React, { Component } from 'react';
import { Confirmation } from './confirmation.js';
import { styles } from './styles.js';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  DatePickerIOS,
  ScrollView
} from 'react-native';

export class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      date: this.date,
      somewhereElse: false,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      currentAddress: ''
    };
    this.onDateChange = this.onDateChange.bind(this);
    this._onForward = this._onForward.bind(this);
    this.toggleCustomAddressbar = this.toggleCustomAddressbar.bind(this);
    this.setLocationToHere = this.setLocationToHere.bind(this);
    this.getCoordsByAddress = this.getCoordsByAddress.bind(this);
    this.getCurrentAddress = this.getCurrentAddress.bind(this);
    this._customLocation = this._customLocation.bind(this);
  }

  onDateChange(date) {
    this.setState({date: date});
  }

  getCurrentAddress() {
    var key = 'AIzaSyCrkf6vpb_McrZE8p4jg4oUH-oqyGwFdUo';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.props.latitude + ',' + this.props.longitude + '&key=' + key;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      return res.json();   
    }).then((resJson) => {
      console.log('getting google result?--->', resJson)
      this.setState({
        location: resJson.results[0].formatted_address,
        currentAddress: resJson.results[0].formatted_address
      });
    })
    .catch((err) => {
      console.log('There is an error. It\'s sad day D=', err.status, err);
    });
  }

  componentDidMount() {
    this.getCurrentAddress();
  }
  
  _customLocation() {
    if (this.state.somewhereElse) {
      this.getCoordsByAddress();
    } else {
      this._onForward();
    }
  }

  _onForward() {
    this.props.navigator.push({
      title: 'Confirm Your Event Information',
      component: Confirmation,
      passProps: {
        title: this.state.title,
        category: this.state.category,
        location: this.state.location,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        date: this.state.date,
        description: this.state.description
      }
    });
  }

  getCoordsByAddress() {
    //API call to google to get coords when user input is an address
    var address = this.state.location.replace(' ', '+');
    var key = 'AIzaSyCrkf6vpb_McrZE8p4jg4oUH-oqyGwFdUo';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;
    console.log('are you in here?', url);
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      return res.json();   
    }).then((resJson) => {
      console.log('getting google result?--->', resJson)
      this.setState({latitude: resJson.results[0].geometry.location.lat});
      this.setState({longitude: resJson.results[0].geometry.location.lng});
    })
    .then((res) => {
      this._onForward()
    })
    .catch((err) => {
      console.log('There is an error. It\'s sad day D=', err.status, err);
    });
  }

  toggleCustomAddressbar() {
    this.setState({
      somewhereElse: true,
      location: ''
    });
  }

  setLocationToHere() {
    this.setState({
      somewhereElse: false,
      location: this.state.currentAddress,
      latitude: this.props.latitude,
      longitude: this.props.longitude
    });
    console.log(this.state.somewhereElse);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.eventInputs}>
          <Text style={styles.eventText}>Title</Text>
          <TextInput
            maxLength={25}
            style={styles.eventsTextInput}
            placeholder={"name your event"}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
          <Text style={styles.eventText}>Category</Text>
          <TextInput
            maxLength={20}
            style={styles.eventsTextInput}
            placeholder={"flash mob? party? social mixer?"}
            onChangeText={(category) => this.setState({category})}
            value={this.state.category}
          />
          <Text style={styles.eventText}>Where is the event?</Text>
          <View style={styles.buttonContainer}>
            <TouchableHighlight underlayColor='white' style={this.state.somewhereElse ? styles.meComing : styles.meComingHightlight} onPress={this.setLocationToHere}> 
              <Text style={styles.meComingText}>Here</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='white' style={this.state.somewhereElse ? styles.meComingHightlight : styles.meComing} onPress={this.toggleCustomAddressbar}> 
              <Text style={styles.meComingText}>Elsewhere</Text>
            </TouchableHighlight>
          </View>
            {this.state.somewhereElse ? <TextInput
              style={styles.eventsTextInput}
              placeholder={this.state.currentAddress}
              onChangeText={(location) => this.setState({location})}
              value={this.state.location}
              /> : null}
            {!this.state.somewhereElse ? <Text>{this.state.location}</Text> : null}
          <Text style={styles.eventText}>Pick a time and date</Text>
          <DatePickerIOS
                    date={this.state.date}
                    mode="datetime"
                    onDateChange={this.onDateChange}
                  />
          <Text style={styles.eventText}>More Information</Text>
          <TextInput
            style={styles.description}
            multiline={true}
            placeholder={"what is the plan?"}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
          />
        </View>
        <TouchableHighlight style={[styles.button, styles.newButton]} underlayColor='white' onPress={this._customLocation}> 
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 70,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     flexDirection: 'column'
//   },
//   input: {
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
//   },
//   textInput: {
//     height: 30,
//     width: 300,
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 1
//   },
//   description: {
//     height: 120,
//     width: 300,
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 1
//   }
// });
