'use strict';

import React, {
  Alert,
  AsyncStorage,
  Component,
  Image,
  TextInput,
  View
} from 'react-native';

import Firebase from 'firebase';

import AppBar from '../components/app-bar';
import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import ForgotPassword from './forgot-password';
import Main from './main';
import SceneStyles from '../styles/scene-styles';
import Signup from './signup';
import TextStyles from '../styles/text-styles';

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
        <Image
          source = {require('../images/coco_color_40.jpg')}
          style = {SceneStyles.backgroundImage}>

          <AppBar
            image = {require('../images/logo.png')}
          />

          <TextInput
            placeholder = {"Email"}
            onChangeText = {(text) => this.setState({email: text})}
            value = {this.state.email}
            style = {TextStyles.textInput}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'
            keyboardType = 'email-address'
          />
          <TextInput
            placeholder = {"Password"}
            onChangeText = {(text) => this.setState({password: text})}
            value = {this.state.password}
            style = {TextStyles.textInput}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'
            secureTextEntry = {true}
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
        </Image>
      </View>
    );
  }

  login() {
    if(this.state.email === "" && this.state.password === "") {
      Alert.alert('', 'Enter your account information.')
    } else if(this.state.email === "") {
      Alert.alert('', 'Enter your email.');
    } else if(this.state.password === "") {
      Alert.alert('', 'Enter your password.');
    } else {
      database.authWithPassword({
        "email": this.state.email,
        "password": this.state.password
      },
        (error, user_data) => {
          if(error) {
            Alert.alert('Error!', 'Log in failed. Please try again.');
          } else {
            AsyncStorage.setItem('user_data', JSON.stringify(user_data));
            this.props.navigator.push({component: Main});
          }
        }
      );
    }
  }

  goToSignup() {
    this.props.navigator.push({component: Signup});
  }

  goToForgotPassword() {
    this.props.navigator.push({component: ForgotPassword});
  }
}

module.exports = Login;
