'use strict';

const React = require('react-native');
const { StyleSheet, View, Text, TextInput } = React;
const Button = require('../base/button');

const StatusBar = require('../base/status-bar');
const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');

class LoginScene extends React.Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    }
  }

  render() {
    return (
      <View style = {styles.container} >
        <StatusBar
          title = {'POOP App'}
          backgroundColor = '#2196F3'
          textColor = 'white' />
        <View style = {styles.form} >
          <Text
            style = {styles.label} >
            Username
          </Text>
          <TextInput
            style = {styles.input}
            onChangeText = {(username) => this.setState({username})} />
          <Text
            style = {styles.label} >
            Password
          </Text>
          <TextInput
            style = {styles.input}
            onChangeText = {(password) => this.setState({password})} />
          <Button
            onPress = {this.buttonClicked.bind(this)}
            color = {'#2196F3'}
            text = {'Log In'} />
        </View>
      </View>
    );
  }

  buttonClicked(){
    if(this.isValidAccount(this.state.username, this.state.password)){
      // change to home scene
      console.warn(this.state.username + ", " + this.state.password);
    }
    else if(this.isValidUsername(this.state.username)){
      if(this.isValidPassword(this.state.password)){
        // register new account on firebase
      }
    }
  }

  isValidAccount(username, password){
    // check firebase
    return true;
  }

  isValidUsername(username){
    return true;
  }

  isValidPassword(password){
    return true;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: '#2196F3',
  },
  input: {
    width: windowSize.width,
    height: 50,
  },
});

module.exports = LoginScene;
