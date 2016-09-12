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
  ScrollView
} from 'react-native';

export class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      date: this.date,
    };
    this.onDateChange = this.onDateChange.bind(this);
    this._onForward = this._onForward.bind(this);
  }

  onDateChange(date) {
    this.setState({date: date});
  }

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
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.eventInputs}>
          <Text style={styles.eventText}>Title of event</Text>
          <TextInput
            maxLength={25}
            style={styles.eventsTextInput}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
          <Text style={styles.eventText}>Category</Text>
          <TextInput
            maxLength={20}
            style={styles.eventsTextInput}
            onChangeText={(category) => this.setState({category})}
            value={this.state.category}
          />
          <Text style={styles.eventText}>Where is the event?</Text>
          <TextInput
            style={styles.eventsTextInput}
            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
          />
          <Text style={styles.eventText}>Pick a time and date</Text>
          <DatePickerIOS
                    date={this.state.date}
                    mode="datetime"
                    onDateChange={this.onDateChange}
                  />
          <Text style={styles.eventText}>More Information</Text>
          <TextInput
            style={styles.description}
            multiline = {true}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
          />
        </View>
        <TouchableHighlight style={[styles.button, styles.newButton]} underlayColor='white' onPress={this._onForward}> 
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 70,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     flexDirection: 'column'
//   },
//   input: {
//     flex: 1
//   },
//   bottomBar: {
//     backgroundColor: '#cccccc',
//     marginBottom: 0,
//     paddingBottom: 10,
//     paddingTop: 10,
//     flexDirection: 'row'
//   },
//   footer: {
//     fontSize: 20,
//     textAlign: 'center',
//     flex: 1
//   },
//   textInput: {
//     height: 30,
//     width: 300,
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 1
//   },
//   description: {
//     height: 120,
//     width: 300,
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 1
//   }
// });
