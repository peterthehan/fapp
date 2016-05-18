'use strict';

import React, {
  AsyncStorage,
  Component,
  Image,
  TextInput,
  View
} from 'react-native';

import Firebase from 'firebase';
let app = new Firebase("poopapp1.firebaseio.com");

import Signup from './signup';
import Main from './main';

import Button from '../components/button';
import Header from '../components/header';

import ButtonStyles from '../styles/button-styles';
import HeaderStyles from '../styles/header-styles';
import SceneStyles from '../styles/scene-styles';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      // loaded: true
    }
  }

  render() {
    return (
      <Image style = {SceneStyles.backgroundImage}
        source = {require('../images/coco_color_40.jpg')}>

        <View style = {SceneStyles.container}>
          <Header text = ""/>

          <View style = {SceneStyles.body}>
            <TextInput
              placeholder = {"Email"}
              onChangeText = {(text) => this.setState({email: text})}
              value = {this.state.email}
              style = {SceneStyles.textinput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'/>
            <TextInput
              secureTextEntry = {true}
              placeholder = {"Password"}
              onChangeText = {(text) => this.setState({password: text})}
              value = {this.state.password}
              style = {SceneStyles.textinput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'/>

            <Button
              text = "LOG IN"
              onpress = {this.login.bind(this)}
              button_styles = {ButtonStyles.primary_button}
              button_text_styles = {ButtonStyles.primary_button_text}/>
            <Button
              text = "Create New Account"
              onpress = {this.goToSignup.bind(this)}
              button_styles = {ButtonStyles.transparent_button}
              button_text_styles = {ButtonStyles.transparent_button_text}/>
            <Button
              text = "Forgot Password?"
              onpress = {this.goToForgotPassword.bind(this)}
              button_styles = {ButtonStyles.transparent_button}
              button_text_styles = {ButtonStyles.transparent_button_text}/>
          </View>
        </View>
      </Image>
    );
  }

  login() {
    // this.setState({loaded: false});

    app.authWithPassword({
      "email": this.state.email,
      "password": this.state.password
      },
      (error, user_data) => {
      // this.setState({loaded: true});
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

  goToForgotPassword() {
    alert("forgot password")
  }
}

module.exports = Login;
