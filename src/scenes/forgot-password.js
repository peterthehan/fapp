'use strict';

import React, {
  Alert,
  Component,
  Image,
  Text,
  TextInput,
  View,
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
      email: '',
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

          <Text style = {TextStyles.whiteText}>
            Find Your Account
          </Text>

          <TextInput
            keyboardType = 'email-address'
            onChangeText = {(text) => this.setState({email: text})}
            placeholder = {"Email"}
            placeholderTextColor = 'white'
            style = {TextStyles.textInput}
            underlineColorAndroid = 'white'
            value = {this.state.email}
          />

          <Button
            buttonStyles = {ButtonStyles.primaryButton}
            buttonTextStyles = {ButtonStyles.whiteButtonText}
            onPress = {this.submit.bind(this)}
            text = "SEARCH"
            underlayColor = {'#B18C40'}
          />
          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.whiteButtonText}
            onPress = {this.goToLogin.bind(this)}
            text = "Go Back"
            underlayColor = {'gray'}
          />
        </Image>
      </View>
    );
  }

  submit() {
    if(this.state.email === "") {
      Alert.alert('', 'Enter your email.');
    }
    Alert.alert('', 'Access database.');
  }

  goToLogin() {
    this.props.navigator.pop();
  }
}

module.exports = ForgotPassword;
