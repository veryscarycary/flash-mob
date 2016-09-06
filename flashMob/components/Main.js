import React, { Component } from 'react';
import Button from 'react-native-button';
import { Signup } from './signup.js';
import { Login } from './login.js';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  subhead: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },

  button: {
    height: 45,
    width: 250,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  newButton: {
    marginBottom: 0,
    borderRadius: 15,
  },
  signupButton: {
    backgroundColor: '#778899',
  },
  loginButton: {
    backgroundColor: '#48BBEC',
  },
  textInput: {
    height: 40, 
    borderColor: 'gray',
    borderWidth: 1
  }
});

export class Main extends Component {
  constructor(props) {
    super(props);

    this.openLogin = this.openLogin.bind(this);
    this.openSignup = this.openSignup.bind(this);
  }

  openLogin() {
    this.props.navigator.push({
      title: 'login',
      component: Login
    });
  }

  openSignup() {
    this.props.navigator.push({
      title: 'signup',
      component: Signup
    });
    //<Signup styles={this.props.styles}/>
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Flash!
        </Text>
        <Text style={styles.subhead}>
          Entertainment in a whim!
        </Text>
            <TouchableHighlight style={[styles.button, styles.newButton, styles.loginButton]} underlayColor='white' onPress={this.openLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, styles.newButton, styles.signupButton]} underlayColor='white' onPress={this.openSignup}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableHighlight>
      </View>
        
      );
  }
}
