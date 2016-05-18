'use strict';

import React, {
  Component,
  DatePickerAndroid,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import Firebase from 'firebase';
let app = new Firebase("poopapp1.firebaseio.com");

import Login from './login';

import Button from '../components/button';
import Header from '../components/header';

import ButtonStyles from '../styles/button-styles';
import SceneStyles from '../styles/scene-styles';

export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
      showDatePicker: false,
      email: '',
      password: '',
      passwordConfirm: ''
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
            <View style = {SceneStyles.oneLine}>
              <TextInput
                placeholder = {"First Name"}
                onChangeText = {(text) => this.setState({firstName: text})}
                value = {this.state.firstName}
                style = {SceneStyles.firstName}
                placeholderTextColor = 'white'
                underlineColorAndroid = 'white'/>
              <TextInput
                placeholder = {"Last Name"}
                onChangeText = {(text) => this.setState({lastName: text})}
                value = {this.state.lastName}
                style = {SceneStyles.lastName}
                placeholderTextColor = 'white'
                underlineColorAndroid = 'white'/>
            </View>

            <TextInput
              keyboardType = 'numeric'
              placeholder = {"MM/DD/YYYY"}
              value = {this.state.dateOfBirth}
              style = {SceneStyles.textInput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
            />

            <TextInput
              keyboardType = 'email-address'
              placeholder = {"Email"}
              onChangeText = {(text) => this.setState({email: text})}
              value = {this.state.email}
              style = {SceneStyles.textInput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'/>
            <TextInput
              secureTextEntry = {true}
              placeholder = {"Password"}
              onChangeText = {(text) => this.setState({password: text})}
              value = {this.state.password}
              style = {SceneStyles.textInput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'/>
            <TextInput
              secureTextEntry = {true}
              placeholder = {"Confirm Password"}
              onChangeText = {(text) => this.setState({passwordConfirm: text})}
              value = {this.state.password}
              style = {SceneStyles.textInput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'/>

            <Button
              text = "SIGN UP"
              onpress = {this.signup.bind(this)}
              button_styles = {ButtonStyles.primaryButton}
              button_text_styles = {ButtonStyles.primaryButtonText}/>
            <Button
              text = "Already Have An Account"
              onpress = {this.goToLogin.bind(this)}
              button_styles = {ButtonStyles.transparentButton}
              button_text_styles = {ButtonStyles.transparentButtonText}/>
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
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        password: '',
        passwordConfirm: ''
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
