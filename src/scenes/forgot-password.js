'use strict';

import React, {
  Component,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

import Firebase from 'firebase';

import Login from './login';

import Button from '../components/button';
import Header from '../components/header';

import ButtonStyles from '../styles/button-styles';
import SceneStyles from '../styles/scene-styles';

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
        <Image style = {SceneStyles.backgroundImage}
          source = {require('../images/coco_color_40.jpg')}>

          <Header
            text = ""
            image = {require('../images/logo.png')}
          />

          <View style = {SceneStyles.body}>
            <Text style = {SceneStyles.text}>
              Find Your Account
            </Text>

            <TextInput
              keyboardType = 'email-address'
              placeholder = {"Email"}
              onChangeText = {(text) => this.setState({email: text})}
              value = {this.state.email}
              style = {SceneStyles.textInput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
            />

            <Button
              text = "SEARCH"
              onPress = {this.submit.bind(this)}
              buttonStyles = {ButtonStyles.primaryButton}
              buttonTextStyles = {ButtonStyles.primaryButtonText}
              underlayColor = {"#B18C40"}
            />
            <Button
              text = "Cancel"
              onPress = {this.goToLogin.bind(this)}
              buttonStyles = {ButtonStyles.transparentButton}
              buttonTextStyles = {ButtonStyles.transparentButtonText}
              underlayColor = {"#A2A2A2"}
            />
          </View>
        </Image>
      </View>
    );
  }

  submit() {
    alert("get pw");
  }

  goToLogin() {
    this.props.navigator.pop();
  }
}

module.exports = ForgotPassword;
