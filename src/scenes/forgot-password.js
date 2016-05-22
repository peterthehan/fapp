'use strict';

import React, {
  Alert,
  Component,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

import Firebase from 'firebase';

import AppBar from '../components/app-bar';
import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Login from './login';
import SceneStyles from '../styles/scene-styles';
import TextStyles from '../styles/text-styles';

let database = new Firebase("poopapp1.firebaseio.com");

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
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

          <Text style = {TextStyles.text}>
            Find Your Account
          </Text>

          <TextInput
            placeholder = {"Email"}
            onChangeText = {(text) => this.setState({email: text})}
            value = {this.state.email}
            style = {TextStyles.textInput}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'
            keyboardType = 'email-address'
          />

          <Button
            text = "SEARCH"
            onPress = {this.submit.bind(this)}
            buttonStyles = {ButtonStyles.primaryButton}
            buttonTextStyles = {ButtonStyles.primaryButtonText}
            underlayColor = {"#B18C40"}
          />
          <Button
            text = "Go Back"
            onPress = {this.goToLogin.bind(this)}
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.transparentButtonText}
            underlayColor = {"#A2A2A2"}
          />
        </Image>
      </View>
    );
  }

  submit() {
    if(this.state.email === "") {
      Alert.alert('', 'Enter your email.');
    }
    alert('Access database.');
  }

  goToLogin() {
    this.props.navigator.pop();
  }
}

module.exports = ForgotPassword;
