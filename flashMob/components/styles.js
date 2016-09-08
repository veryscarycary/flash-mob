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
    marginBottom: 0,
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
  }
});