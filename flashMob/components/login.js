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
    marginLeft: 20
  }
});

export class Login extends Component {
  constructor(props) {
    super(props);

  }

  handleSubmit() {

  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.allText}>username:</Text>
          <TextInput style={styles.textInput} onChangeText={(text)=>this.setState({username: text})}/>
          <Text style={styles.allText}>password:</Text>
          <TextInput style={styles.textInput} onChangeText={(text)=>this.setState({password: text})}/>
          <Text></Text>
          <TouchableHighlight style={[styles.button, styles.newButton]} onPress={this.handleSubmit.bind(this)}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableHighlight>
        </View>
      );
  }
}