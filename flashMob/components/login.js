import React, { Component } from 'react';
import { styles } from './styles.js';
import { Location } from './location.js';

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
    }).then(function(res) {
      if (res.statusCode === 303) {
      //redirect to logged in page , with status code 303
        this.setState({isLoggedin: true});      
      } else {
        
      }
      //400 request cannot be found
    }).catch(function(err) {
      console.log('There is an error. It\'s sad day D=', err);
    });
  }

//onChangeText will collect text input and set it to state object
  render() {
    return (
        <View style={styles.textInputContainer}>
          <Text style={styles.allText}>Username:</Text>
          <TextInput style={styles.textInput} autoCapitalize='none' onChangeText={(text)=>this.setState({username: text})}/>
          <Text style={styles.allText}>Password:</Text>
          <TextInput secureTextEntry={true} autoCapitalize='none' style={styles.textInput} onChangeText={(text)=>this.setState({password: text})}/>
          <Text></Text>
          <TouchableHighlight style={[styles.button, styles.newButton]} underlayColor='white' onPress={this.handleLogin.bind(this)}>
            <Text style={styles.buttonText}>SEND</Text>
          </TouchableHighlight>
        </View>
      );
  }
}