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
  ScrollView,
  Alert
} from 'react-native';

export class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      title: null,
      date: this.date,
      somewhereElse: false,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      currentAddress: '',
      private: false,
      invites: [],
      instagramHashtag: null
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (this.titleCheck() && this.hashtagCheck()) {
      this._customLocation();
    }

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
      //console.log('getting google result?--->', resJson)
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
        username: this.props.username,
        private: this.state.private,
        invites: this.state.invites,
        instagramHashtag: this.state.instagramHashtag,
        refreshCurrent: this.props.refreshCurrent, 
        refreshPast: this.props.refreshPast, 
        current: this.props.current
      }
    });
  }

  hashtagCheck() {
    var hashtag = this.state.instagramHashtag;
    if (hashtag) {
      hashtag = hashtag.trim();
      if (hashtag.split(' ').length > 1 || hashtag.substring(1).split('#').length > 1) {
        //put alert message here with appropriate message
        Alert.alert(
          'Invalid Hashtag',
          //[{text: <Text>Errorrrr</Text>}],
          'Please use the following convention: ' +
          '\n - only one hashtag allowed' + 
          '\n - no spaces between letters' + 
          '\n - only use one hashtag symbol' +
          '\n - do not start with a number' +
          '\n - no special characters: \n !@$%^&*()?<>/\'\\,.+-={}[]~`|',
          [{text: 'OK', onPress: () => { console.log('OK pressed'); } }]
        );
        return false;
      }
      if (hashtag[0] !== '#') {
        hashtag = '#' + hashtag;
      }
      this.setState({instagramHashtag: hashtag});
    }
    return true;
  }

  titleCheck() {
    if (!this.state.title) {
      Alert.alert(
        'Incomplete',
        'Please add a name for your event',
        [{text: 'OK', onPress: () => { console.log('OK pressed'); } }]
      );
      return false;
    }
    return true;
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
      this._onForward();
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

  removeFriend(i) {
    var invites = this.state.invites;
    invites.splice(i, 1);
    // this.setState({
    //   invites: invites
    // });
    this.setState({invites});
  }

  addFriends() {

    if (!this.state.invitedFriends || this.state.invites.indexOf(this.state.invitedFriends) !== -1) {
      return; 
    }

    var friends = this.state.invitedFriends;
    var friendsArray = friends.split(',');
    for (var i = 0; i < friendsArray.length; i++) {
      friendsArray[i] = friendsArray[i].trim();
    }
    var invites = this.state.invites.concat(friendsArray);
    // console.log('invites array: ', invites);
    //var invitesLength = invites.length;
    for (var i = invites.length; i >= 0; i--) {
      if (invites.slice(i + 1).indexOf(invites[i]) !== -1) {
        invites.splice(i, 1);
      }
    }
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
          <Text style={styles.eventText}>Event Name</Text>
          <TextInput
            maxLength={25}
            style={styles.eventsTextInput}
            placeholder={"Add a short, clear name"}
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
            //placeholder='Include a place or address'
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
          <View>
            {this.state.invites.map((friend, i) => 
              <Text key={i} onPress={this.removeFriend.bind(this, i)} style={styles.meComingText} onClick>{friend}</Text>)}
          </View>

          <Text style={styles.eventText}> </Text>

          <Text style={styles.eventText}>Add an Instagram hashtag for your event:</Text>
          <TextInput
            maxLength={20}
            style={styles.eventsTextInput}
            placeholder={"#HRflashmob2016"}
            onChangeText={(instagramHashtag) => this.setState({instagramHashtag})}
            value={this.state.instagramHashtag}
          />

          <Text style={styles.eventText}> </Text>
          <Text style={styles.eventText}>Description</Text>
          <TextInput
            style={styles.description}
            multiline={true}
            placeholder={"Tell people more about the event"}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
          />
        </View>
        <TouchableHighlight style={[styles.button, styles.newButton]} underlayColor='white' onPress={this.handleSubmit}> 
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableHighlight>
      </View>
      </ScrollView>
    );
  }
}