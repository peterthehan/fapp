'use strict';

import React, {
  Component,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import Firebase from 'firebase';
let app = new Firebase("poopapp1.firebaseio.com");

import ButtonStyles from '../styles/button-styles';
import HeaderStyles from '../styles/header-styles';

export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <Image
        source = {require('../images/coco_color_40.jpg')}
        style={HeaderStyles.backgroundImage}>
        <View style = {HeaderStyles.container}>
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
              text = "Sign up"
              onpress = {this.signup.bind(this)}
              button_styles = {ButtonStyles.primary_button}
              button_text_styles = {ButtonStyles.primary_button_text}/>
            <Button
              text = "Already have an account"
              onpress = {this.goToLogin.bind(this)}
              button_styles = {ButtonStyles.transparent_button}
              button_text_styles = {ButtonStyles.transparent_button_text}/>
          </View>
        </View>
      </Image>
    );
  }

  signup() {
    this.setState({loaded: false});

    app.createUser({
      'email': this.state.email,
      'password': this.state.password
      },
      (error, userData) => {
      if(error) {
        switch(error.code) {
          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
          break;

          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
          break;

          default:
            alert("Error creating user:");
        }
      } else {
        alert('Your account was created!');
      }

      this.setState({
        email: '',
        password: '',
        loaded: true
      });
    });
  }

  goToLogin() {
    this.props.navigator.push({
      component: Login,
      type: 'index2'
    });
  }
}

module.exports = Signup;