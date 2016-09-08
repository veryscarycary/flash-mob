import React, { Component } from 'react';
import { Confirmation } from './confirmation.js'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  DatePickerIOS
} from 'react-native';

export class CreateEvent extends Component {
  constructor(props) {
    super(props)
    this.date = new Date()
    this.state = {
      date: this.date,
    }
    this.onDateChange = this.onDateChange.bind(this)
    this._onForward = this._onForward.bind(this)
  }

  onDateChange(date) {
    this.setState({date: date});
  };

  _onForward() {
    this.props.navigator.push({
      title: 'Confirm Your Event Information',
      component: Confirmation,
      passProps: {
        title: this.state.title,
        category: this.state.category,
        location: this.state.location,
        date: this.state.date,
        description: this.state.description
      }
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text>Title of event</Text>
          <TextInput
            maxLength={25}
            style={styles.title, styles.textInput}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
          <Text>Category</Text>
          <TextInput
            maxLength={20}
            style={styles.category, styles.textInput}
            onChangeText={(category) => this.setState({category})}
            value={this.state.category}
          />
          <Text>Where is the event?</Text>
          <TextInput
            style={styles.location, styles.textInput}
            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
          />
          <Text>Pick a time and date</Text>
          <DatePickerIOS
                    date={this.state.date}
                    mode="datetime"
                    onDateChange={this.onDateChange}
                  />
          <Text>More Information</Text>
          <TextInput
            style={styles.description}
            multiline = {true}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
          />
        </View>
        <TouchableHighlight style={styles.bottomBar} onPress={this._onForward}> 
          <Text style={styles.footer}>Confirm Event Details</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column'
  },
  input: {
    flex: 1
  },
  bottomBar: {
    backgroundColor: '#cccccc',
    marginBottom: 0,
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row'
  },
  footer: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1
  },
  textInput: {
    height: 30,
    width: 300,
    borderWidth: 1,
    borderColor: 'black',
    padding: 1
  },
  description: {
    height: 120,
    width: 300,
    borderWidth: 1,
    borderColor: 'black',
    padding: 1
  }
});
