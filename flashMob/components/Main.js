import React, { Component } from 'react';
import Button from 'react-native-button';
import { Signup } from './signup.js';
import { Login } from './login.js';
import { styles } from './styles.js';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';

export class Main extends Component {
  constructor(props) {
    super(props);

    this.openLogin = this.openLogin.bind(this);
    this.openSignup = this.openSignup.bind(this);
  }

  openLogin() {
    this.props.navigator.push({
      title: 'Log in',
      component: Login
    });
  }

  openSignup() {
    this.props.navigator.push({
      title: 'Sign Up',
      component: Signup
    });
    //<Signup styles={this.props.styles}/>
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('./img/flash-logo-pink.png')} />
        <Image style={styles.imageChar} source={require('./img/flash-logo-char.png')} />
        <Text style={styles.subhead}>
          Entertainment in a whim!
        </Text>
        <View style={styles.buttonContainer}>
            <TouchableHighlight style={[styles.button, styles.newButton, styles.loginButton]} underlayColor='white' onPress={this.openLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableHighlight>
            <Text></Text>
            <TouchableHighlight style={[styles.button, styles.newButton, styles.signupButton]} underlayColor='white' onPress={this.openSignup}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableHighlight>
        </View>
      </View>
        
      );
  }
}
