'use strict';

import React, { PropTypes, StyleSheet, Text, TextInput, View } from 'react-native';
import Dimensions from 'Dimensions';

import Button from '../base/button';
import HomeScene from './home-scene';

const windowSize = Dimensions.get('window');

const propTypes = {
  toRoute: PropTypes.func.isRequired,
};

class LoginScene extends React.Component {

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);

    this.state = {
      username: "",
      password: "",
    }
  }

  nextPage() {
    this.props.toRoute({
      name: "Home",
      component: HomeScene,
    })
  }

  render() {
    return (
      <View style = {styles.container} >
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
            color = {'#4CAF50'}
            text = {'Log In'} />
        </View>
      </View>
    );
  }

  buttonClicked(){
    if(this.isValidAccount(this.state.username, this.state.password)){
      this.nextPage();
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
    color: '#4CAF50',
  },
  input: {
    width: windowSize.width,
    height: 50,
  },
});

LoginScene.propTypes = propTypes;

module.exports = LoginScene;
