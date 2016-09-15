import React, { Component } from 'react';
import { styles } from './styles.js';
import { Login } from './login.js';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

export class Signup extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      confirm: '',
      pwMatched: false,
      usernameIsUsed: false
    };
  }

  handleSignup() {
    //check if confirm password matches password
    if (this.state.password !== this.state.confirm) {
      this.setState({pwMatched: true});
    } else {
      this.setState({pwMatched: false});
      this.postNewUser();
    }
  }

  postNewUser() {
    //make a post request to server
    fetch('http://localhost:3000/api/signup', {
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
        this.setState({usernameIsUsed: true});
      } else {
        this.redirectToLogin();
      }
    }).catch((err) => {
      //if name exist
      console.log('There is an error. It\'s sad day D=', err);
    });
  }

  redirectToLogin() {
    this.props.navigator.replace({
      //redirect to log in create new nav stack
      title: 'Log in',
      component: Login
    });

  }

//onChangeText will collect text input and set it to state object
  render() {
    return (
        <View style={styles.textInputContainer}>
          {this.state.pwMatched ? <Text style={styles.textAlert}> password does not match, try again!</Text> : null}
          {this.state.usernameIsUsed ? <Text style={styles.textAlert}> username not available, try something else!</Text> : null}
          <Text style={styles.allText}>Username:</Text>
          <TextInput style={styles.textInput} autoCapitalize='none' autoCorrect={false} onChangeText={(text)=>this.setState({username: text})}/>
          <Text></Text>
          <Text style={styles.allText}>Password:</Text>
          <TextInput secureTextEntry={true} autoCapitalize='none' style={styles.textInput} onChangeText={(text)=>this.setState({password: text})}/>
          <Text></Text>
          <Text style={styles.allText}>Confirm Password:</Text>
          <TextInput secureTextEntry={true} autoCapitalize='none' style={styles.textInput} onChangeText={(text)=>this.setState({confirm: text})}/>
          <Text></Text>
          <TouchableHighlight style={[styles.button, styles.newButton]} underlayColor='white' onPress={this.handleSignup.bind(this)}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableHighlight>
        </View>
      );
  }
}
