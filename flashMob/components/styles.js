import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f0f8ff',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  eventInputs: {
    marginTop: 70,
    flex: 1
  },
  image: {
    height: 70,
    width: 60
  },
  imageChar: {
    height: 30,
    width: 90,
    marginBottom: 10,
  },
  heading: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  subhead: {
    fontSize: 15,
    textAlign: 'center',
    color: '#696969',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#ff69b4',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    width: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff69b4',
    marginLeft: 5,
    marginRight: 5,
  },
  newButton: {
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: 'row'
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
    textAlign: 'left',
    left: 20,
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  textAlert: {
    textAlign: 'left',
    left: 20,
    fontSize: 16,
    color: '#ff69b4',
    marginBottom: 5,
  },
  events: {
    marginTop: 70,
    flexDirection: 'row',
    flex: 1,
  },
  greeting: {
    flex: 4,
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    marginBottom: 10,
  },
  event: {
    flexDirection: 'column',
    padding: 8,
    margin: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#696969',
    marginLeft: 10,
    marginRight: 10
  },
  highlight: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  title: {
    flex: 4,
    fontSize: 18,
    fontWeight: 'bold'
  },
  category: {
    flex: 1,
    fontSize: 16
  },
  distAndTime: {
    color: 'grey',
    fontStyle: 'italic'
  },
  hidden: {
    marginLeft: 5,
  },
  meComing: {
    height: 30,
    width: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff69b4',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 15,
  },
  meComingText: {
    fontSize: 16,
    color: '#ff69b4',
    alignSelf: 'center'
  },
  eventsTextInput: {
    height: 38,
    width: 300,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 4,
    marginBottom: 10
  },
  description: {
    height: 85,
    width: 300,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 4,
    marginBottom: 10
  },
  eventText: {
    textAlign: 'left',
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  contentContainer: {
    paddingVertical: 20
  },
  info: {
    color: 'grey',
    fontStyle: 'italic',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10
  },
  confirm: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10
  },
  modalView: {
    marginTop: 22,
    flex: 1,
    justifyContent: 'center'
  }
});