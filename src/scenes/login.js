'use strict';

import React, {
  Alert,
  AsyncStorage,
  Component,
  Image,
  TextInput,
  View,
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
      password: '',
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
            keyboardType = 'email-address'
            onChangeText = {(text) => this.setState({email: text})}
            placeholder = {"Email"}
            placeholderTextColor = 'white'
            style = {TextStyles.whiteTextInput}
            underlineColorAndroid = 'white'
            value = {this.state.email}
            onSubmitEditing={(event) => {this.refs.Password.focus();}}
          />

          <TextInput
            ref = 'Password'
            onChangeText = {(text) => this.setState({password: text})}
            placeholder = {"Password"}
            placeholderTextColor = 'white'
            secureTextEntry = {true}
            style = {TextStyles.whiteTextInput}
            underlineColorAndroid = 'white'
            value = {this.state.password}
            onSubmitEditing={() => {this.login()}}
          />

          <Button
            buttonStyles = {ButtonStyles.primaryButton}
            buttonTextStyles = {ButtonStyles.whiteButtonText}
            onPress = {this.login.bind(this)}
            text = "LOG IN"
            underlayColor = {'#B18C40'}
          />
          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.whiteButtonText}
            onPress = {this.goToSignup.bind(this)}
            text = "Create A New Account"
            underlayColor = {'gray'}
          />
          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.whiteButtonText}
            onPress = {this.goToForgotPassword.bind(this)}
            text = "Forgot Your Password?"
            underlayColor = {'gray'}
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
        email: this.state.email,
        password: this.state.password
      }, (error, user_data) => {
          if(error) {
            Alert.alert('Error!', 'Login failed. Please try again.');
          } else {
            AsyncStorage.setItem('user_data', JSON.stringify(user_data));
            this.props.navigator.resetTo({component: Main});
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
