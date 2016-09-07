import React, { Component } from 'react';
import { styles } from './styles.js';

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
      username: '',
      password: '',
      isLoggedin: false
    };
  }

  handleLogin() {
    fetch('71.6.27.66/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(function(res) {
      this.setState({isLoggedin: true});
    }).catch(function(err) {
      console.log('There is an error. It\'s sad day D=', err);
    });
  }

//onChangeText will collect text input and set it to state object
  render() {
    return (
        <View style={styles.textInputContainer}>
          <Text style={styles.allText}>Username:</Text>
          <TextInput style={styles.textInput} onChangeText={(text)=>this.setState({username: text})}/>
          <Text style={styles.allText}>Password:</Text>
          <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={(text)=>this.setState({password: text})}/>
          <Text></Text>
          <TouchableHighlight style={[styles.button, styles.newButton]} onPress={this.handleLogin.bind(this)}>
            <Text style={styles.buttonText}>SEND</Text>
          </TouchableHighlight>
        </View>
      );
  }
}