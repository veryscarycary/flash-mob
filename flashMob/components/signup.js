import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    width: 150,
    backgroundColor: '#48BBEC',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  newButton: {
    marginBottom: 0,
    borderRadius: 15,
  },
  textInput: {
    height: 40,
    padding: 4,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'black'
  },
  allText: {
    fontSize: 18,
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
    marginTop: 5
  }
});

export class Signup extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      confirm: '',
      pwMatched: false,
      isLoggedin: false
    };
  }

  handleSignup() {
    //check if comfirm password matches password
    if (this.state.password !== this.state.confirm) {
      this.setState({pwMatched: true});
    } else {
      this.setState({pwMatched: false});
      this.postNewUser();
    }
  }

  postNewUser() {
    //make a post request to server
    fetch('71.6.27.66/api/signup', {
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
      redirectToLoggedIn();
    }).catch(function(err) {
      console.log('There is an error. It\'s sad day D=', err);
    });
  }

  redirectToLoggedIn() {
    if (this.state.isLoggedin) {
      //redirect to events page with out using NavigatorIOS
    }
  }

//onChangeText will collect text input and set it to state object
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.allText}>Username:</Text>
          <TextInput style={styles.textInput} onChangeText={(text)=>this.setState({username: text})}/>
          <Text></Text>
          <Text style={styles.allText}>Password:</Text>
          <TextInput style={styles.textInput} onChangeText={(text)=>this.setState({password: text})}/>
          <Text></Text>
          <Text style={styles.allText}>Confirm Password:</Text>
          <TextInput style={styles.textInput} onChangeText={(text)=>this.setState({confirm: text})}/>
          <Text></Text>
          <TouchableHighlight style={[styles.button, styles.newButton]} onPress={this.handleSignup.bind(this)}>
            <Text style={styles.buttonText}>Sign up!</Text>
          </TouchableHighlight>
          <View accessible={this.state.pwMatched}>
          <Text style={styles.allText}> Password does not match, try again!</Text>
          </View>
        </View>
      );
  }
}