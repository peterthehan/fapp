'use strict';

import React, {
  AsyncStorage,
  Component,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Signup from './signup';
import Main from './main';

import Firebase from 'firebase';
let app = new Firebase("poopapp1.firebaseio.com");

import ButtonStyles from '../styles/button-styles';
import HeaderStyles from '../styles/header-styles';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render() {
    return (
      <Image
        source = {require('../images/coco_color_40.jpg')}
        style={HeaderStyles.backgroundImage}>
        <Header text = "POOP" loaded = {this.state.loaded}/>
        <View style = {HeaderStyles.body}>
          <TextInput
            style = {HeaderStyles.textinput}
            onChangeText = {(text) => this.setState({email: text})}
            value = {this.state.email}
            placeholder = {"Email Address"}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'/>
          <TextInput
            style = {HeaderStyles.textinput}
            onChangeText = {(text) => this.setState({password: text})}
            value = {this.state.password}
            secureTextEntry = {true}
            placeholder = {"Password"}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'/>
          <Button
            text = "Log in"
            onpress = {this.login.bind(this)}
            button_styles = {ButtonStyles.primary_button}
            button_text_styles = {ButtonStyles.primary_button_text}/>
          <Button
            text = "Create an account"
            onpress = {this.goToSignup.bind(this)}
            button_styles = {ButtonStyles.transparent_button}
            button_text_styles = {ButtonStyles.transparent_button_text}/>
        </View>
      </Image>
    );
  }

  login() {
    this.setState({loaded: false});

    app.authWithPassword({
      "email": this.state.email,
      "password": this.state.password
      },
      (error, user_data) => {
      this.setState({loaded: true});

      if(error) {
        alert('Login Failed. Please try again');
      } else {
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        this.props.navigator.push({component: Main});
      }
    });
  }

  goToSignup() {
    this.props.navigator.push({
      component: Signup,
      type: 'index1'
    });
  }
}

module.exports = Login;
