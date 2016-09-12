import React, { Component } from 'react';
import { styles } from './styles.js';
import { EventsList } from './events.js';
import { Map } from './mapView.js';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: this.props,
      username: '',
      password: '',
      isLoggedin: false,
    };
  }

  handleLogin() {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((res) => {
      if (res.status === 400) {
        this.setState({userNameDoesNotExist: true});
      } else {
      //redirect to events page
        this.setState({isLoggedin: true});      
        this.props.navigator.replacePreviousAndPop({
          title: 'Events',
          component: EventsList,
          passProps: {
            username: this.state.username,
          },
          rightButtonTitle: 'Map',
          onRightButtonPress: () => {
            this.props.navigator.push({
              title: 'Map',
              component: Map,
              passProps: {
                username: this.state.username
              }
            });
          }
        });        
      }
    }).catch((err) => {
      console.log('There is an error. It\'s a sad day D=', err);
    });
  }

//onChangeText will collect text input and set it to state object
  render() {
    return (
        <View style={styles.textInputContainer}>
          {this.state.userNameDoesNotExist ? <Text style={styles.textAlert}>username or password is incorrect</Text> : null}
          <Text style={styles.allText}>Username:</Text>
          <TextInput style={styles.textInput} autoCapitalize='none' autoCorrect={false} onChangeText={(text)=>this.setState({username: text})}/>
          <Text style={styles.allText}>Password:</Text>
          <TextInput secureTextEntry={true} autoCapitalize='none' style={styles.textInput} onChangeText={(text)=>this.setState({password: text})}/>
          <Text></Text>
          <TouchableHighlight style={[styles.button, styles.newButton]} underlayColor='white' onPress={this.handleLogin.bind(this)}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableHighlight>
        </View>
      );
  }
}