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
      currentAddress: '',
      private: false,
      invites: []
    };
    this.onDateChange = this.onDateChange.bind(this);
    this._onForward = this._onForward.bind(this);
    this.toggleCustomAddressbar = this.toggleCustomAddressbar.bind(this);
    this.toggleFriendList = this.toggleFriendList.bind(this);
    this.setToPublic = this.setToPublic.bind(this);
    this.setLocationToHere = this.setLocationToHere.bind(this);
    this.getCoordsByAddress = this.getCoordsByAddress.bind(this);
    this.getCurrentAddress = this.getCurrentAddress.bind(this);
    this._customLocation = this._customLocation.bind(this);
    this.addFriends = this.addFriends.bind(this);
  }
  // state change on ios data picker
  onDateChange(date) {
    this.setState({date: date});
  }

  // uses your current location's lat and long to return an address
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

  // get your current address right away so it is visible
  componentDidMount() {
    this.getCurrentAddress();
  }
  
  // The switch for whether or not to getCoordsByAddress or to pass your current location
  _customLocation() {
    if (this.state.somewhereElse) {
      this.getCoordsByAddress();
    } else {
      this._onForward();
    }
  }

  // push all event information to the confirmation page
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
        description: this.state.description,
        username: this.props.username
      }
    });
  }

  // return lat and long for an address
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

  // toggles whether to use current location or supply text input for custom event address
  toggleCustomAddressbar() {
    this.setState({
      somewhereElse: true,
      location: ''
    });
  }

  toggleFriendList() {
    this.setState({
      private: true
    });
  }  

  setToPublic() {
    this.setState({
      private: false
    });
  }

  addFriends() {

    if (!this.state.invitedFriends) {return; }

    var friends = this.state.invitedFriends;
    var friendsArray = friends.split(',');
    for (var i = 0; i < friendsArray.length; i++) {
      friendsArray[i] = friendsArray[i].trim();
    }
    var invites = this.state.invites.concat(friendsArray);
    // console.log('invites array: ', invites);
    this.setState({ 
      invites: invites
    });
    // console.log('invites state: ,', this.state.invites);
    this.setState({
      invitedFriends: ''
    });

  }

  // set state for current location
  setLocationToHere() {
    this.setState({
      somewhereElse: false,
      location: this.state.currentAddress,
      latitude: this.props.latitude,
      longitude: this.props.longitude
    });
  }

  // text inputs set state to get it ready for transfer to confirmation
  // Confirm button sends to confirmation page
  render() {
    return (
      <ScrollView>
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

          <Text style={styles.eventText}>Is your event public or private?</Text>
          <View style={styles.buttonContainer}>
            <TouchableHighlight underlayColor='white' style={this.state.private ? styles.meComing : styles.meComingHightlight} onPress={this.setToPublic}> 
              <Text style={styles.meComingText}>Public</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='white' style={this.state.private ? styles.meComingHightlight : styles.meComing} onPress={this.toggleFriendList}> 
              <Text style={styles.meComingText}>Private</Text>
            </TouchableHighlight>
          </View> 

          <View style={styles.buttonContainer}>

          {this.state.private ? <TextInput
            style={[styles.eventsTextInput, styles.eventsTextInputShort]}
            placeholder={"invite friends?"}
            onChangeText={(invitedFriends) => this.setState({invitedFriends})}
            value={this.state.invitedFriends}
            /> : null}

          {this.state.private ? <TouchableHighlight style={[styles.add]} underlayColor='white' onPress={this.addFriends}> 
          <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight> : null}

          </View>

          <Text style={styles.eventText}> </Text>
          <Text style={styles.eventText}>More Information</Text>
          <TextInput
            style={styles.description}
            placeholder={"what is the plan?"}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
          />
        </View>
        <TouchableHighlight style={[styles.button, styles.newButton]} underlayColor='white' onPress={this._customLocation}> 
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableHighlight>
      </View>
      </ScrollView>
    );
  }
}