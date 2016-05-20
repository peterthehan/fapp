'use strict';

import React, {
  AsyncStorage,
  Component,
  Image,
  TextInput,
  View
} from 'react-native';

import Firebase from 'firebase';

import Button from '../components/button';
import Header from '../components/header';

import ButtonStyles from '../styles/button-styles';
import SceneStyles from '../styles/scene-styles';

import ForgotPassword from './forgot-password';
import Main from './main';
import Signup from './signup';

let database = new Firebase("poopapp1.firebaseio.com");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <View style = {SceneStyles.container}>
        <Image style = {SceneStyles.backgroundImage}
          source = {require('../images/coco_color_40.jpg')}>

          <Header
            text = ""
            image = {require('../images/logo.png')}
          />

          <View style = {SceneStyles.body}>
            <TextInput
              keyboardType = 'email-address'
              placeholder = {"Email"}
              onChangeText = {(text) => this.setState({email: text})}
              value = {this.state.email}
              style = {SceneStyles.textInput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
            />
            <TextInput
              secureTextEntry = {true}
              placeholder = {"Password"}
              onChangeText = {(text) => this.setState({password: text})}
              value = {this.state.password}
              style = {SceneStyles.textInput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
            />

            <Button
              text = "LOG IN"
              onPress = {this.login.bind(this)}
              buttonStyles = {ButtonStyles.primaryButton}
              buttonTextStyles = {ButtonStyles.primaryButtonText}
              underlayColor = {"#B18C40"}
            />
            <Button
              text = "Create A New Account"
              onPress = {this.goToSignup.bind(this)}
              buttonStyles = {ButtonStyles.transparentButton}
              buttonTextStyles = {ButtonStyles.transparentButtonText}
              underlayColor = {"#A2A2A2"}
            />
            <Button
              text = "Forgot Your Password?"
              onPress = {this.goToForgotPassword.bind(this)}
              buttonStyles = {ButtonStyles.transparentButton}
              buttonTextStyles = {ButtonStyles.transparentButtonText}
              underlayColor = {"#A2A2A2"}
            />
          </View>
        </Image>
      </View>
    );
  }

  login() {
    database.authWithPassword(
      {
        "email": this.state.email,
        "password": this.state.password
      },
      (error, user_data) => {
        if(error) {
          alert('Login Failed. Please try again');
        } else {
          AsyncStorage.setItem('user_data', JSON.stringify(user_data));
          this.props.navigator.push({component: Main});
        }
      }
    );
  }

  goToSignup() {
    this.props.navigator.push({component: Signup});
  }

  goToForgotPassword() {
    this.props.navigator.push({component: ForgotPassword});
  }
}

module.exports = Login;
