'use strict';

import React, {
  Component,
  Image,
  TextInput,
  View
} from 'react-native';

import Firebase from 'firebase';
let app = new Firebase("poopapp1.firebaseio.com");

import Login from './login';

import Button from '../components/button';
import Header from '../components/header';

import ButtonStyles from '../styles/button-styles';
import HeaderStyles from '../styles/header-styles';
import SceneStyles from '../styles/scene-styles';

export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      dateOfBirth: '',
      // loaded: true,
    };
  }

  render() {
    return (
      <Image style = {SceneStyles.backgroundImage}
        source = {require('../images/coco_color_40.jpg')}>

        <View style = {SceneStyles.container}>
          <Header text = ""/>

          <View style = {SceneStyles.body}>
            <TextInput
              placeholder = {"First Name"}
              onChangeText = {(text) => this.setState({firstName: text})}
              value = {this.state.firstName}
              style = {SceneStyles.textinput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'/>
            <TextInput
              placeholder = {"Last Name"}
              onChangeText = {(text) => this.setState({lastName: text})}
              value = {this.state.lastName}
              style = {SceneStyles.textinput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'/>
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
            <TextInput
              secureTextEntry = {true}
              placeholder = {"Confirm Password"}
              onChangeText = {(text) => this.setState({passwordConfirm: text})}
              value = {this.state.password}
              style = {SceneStyles.textinput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'/>


            <Button
              text = "SIGN UP"
              onpress = {this.signup.bind(this)}
              button_styles = {ButtonStyles.primary_button}
              button_text_styles = {ButtonStyles.primary_button_text}/>
            <Button
              text = "Already Have An Account"
              onpress = {this.goToLogin.bind(this)}
              button_styles = {ButtonStyles.transparent_button}
              button_text_styles = {ButtonStyles.transparent_button_text}/>
          </View>
        </View>
      </Image>
    );
  }

  signup() {
    // this.setState({loaded: false});

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
        var ref = app.child("users");
        var uid = userData.uid;
        ref.child(uid).set({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            profilePic: "",
        });
        alert('Your account was created!');
      }

      this.setState({
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        // loaded: true
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
