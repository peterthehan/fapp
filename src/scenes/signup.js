'use strict';

import React, {
  Component,
  Image,
  TextInput,
  View
} from 'react-native';

import Firebase from 'firebase';

import AppBar from '../components/app-bar';
import Button from '../components/button';

import SceneStyles from '../styles/scene-styles';
import TextStyles from '../styles/text-styles';
import ButtonStyles from '../styles/button-styles';

import Login from './login';

let database = new Firebase("poopapp1.firebaseio.com");

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };
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

          <View style = {TextStyles.oneLine}>
            <TextInput
              placeholder = {"First Name"}
              onChangeText = {(text) => this.setState({firstName: text})}
              value = {this.state.firstName}
              style = {TextStyles.leftTextInput}
              placeholderTextColor = '#FFF'
              underlineColorAndroid = '#FFF'
            />
            <TextInput
              placeholder = {"Last Name"}
              onChangeText = {(text) => this.setState({lastName: text})}
              value = {this.state.lastName}
              style = {TextStyles.rightTextInput}
              placeholderTextColor = '#FFF'
              underlineColorAndroid = '#FFF'
            />
          </View>

          <TextInput
            placeholder = {"MM/DD/YYYY"}
            onChangeText = {(text) => this.setState({dateOfBirth: text})}
            value = {this.state.dateOfBirth}
            style = {TextStyles.textInput}
            placeholderTextColor = '#FFF'
            underlineColorAndroid = '#FFF'
            keyboardType = 'numeric'
          />
          <TextInput
            placeholder = {"Email"}
            onChangeText = {(text) => this.setState({email: text})}
            value = {this.state.email}
            style = {TextStyles.textInput}
            placeholderTextColor = '#FFF'
            underlineColorAndroid = '#FFF'
            keyboardType = 'email-address'
          />
          <TextInput
            placeholder = {"Password"}
            onChangeText = {(text) => this.setState({password: text})}
            value = {this.state.password}
            style = {TextStyles.textInput}
            placeholderTextColor = '#FFF'
            underlineColorAndroid = '#FFF'
            secureTextEntry = {true}
          />
          <TextInput
            placeholder = {"Confirm Password"}
            onChangeText = {(text) => this.setState({passwordConfirm: text})}
            value = {this.state.passwordConfirm}
            style = {TextStyles.textInput}
            placeholderTextColor = '#FFF'
            underlineColorAndroid = '#FFF'
            secureTextEntry = {true}
          />

          <Button
            text = "SIGN UP"
            onPress = {this.signup.bind(this)}
            buttonStyles = {ButtonStyles.primaryButton}
            buttonTextStyles = {ButtonStyles.primaryButtonText}
            underlayColor = {"#B18C40"}
          />
          <Button
            text = "Already Have An Account"
            onPress = {this.goToLogin.bind(this)}
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.transparentButtonText}
            underlayColor = {"#A2A2A2"}
          />
        </Image>
      </View>
    );
  }

  signup() {
    if(this.state.firstName === "") {
      alert("Enter your first name.");
    } else if(this.state.lastName === "") {
      alert("Enter your last name.");
    } else if(this.state.dateOfBirth === "") {
      alert("Enter your date of birth.");
    } else if(this.state.email === "") {
      alert("Enter your email.");
    } else if(this.state.password === "") {
      alert("Enter your password.");
    } else if(this.state.passwordConfirm === "") {
      alert("Confirm your password.");
    } else if(this.state.password != this.state.passwordConfirm) {
      alert("The specified passwords do not match.");
    } else {
      database.createUser({
        'email': this.state.email,
        'password': this.state.password
        }, (error, userData) => {
          if(error) {
            switch(error.code) {
              case "EMAIL_TAKEN":
                alert("The new user account cannot be created because the email is already in use.");
              break;
              case "INVALID_EMAIL":
                alert("The specified email is not a valid email.");
              break;
              default:
                alert("Error creating user.");
            }
          } else {
            var ref = database.child("users");
            var uid = userData.uid;
            ref.child(uid).set({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              dateOfBirth: this.state.dateOfBirth,
              email: this.state.email,
              profilePic: "",
            });
            alert('Your account was created!');
            this.setState({
              firstName: '',
              lastName: '',
              dateOfBirth: '',
              email: ''
            });
          }
        }
      );
    }

    this.setState({
      password: '',
      passwordConfirm: ''
    });
  }

  goToLogin() {
    this.props.navigator.pop();
  }
}

module.exports = Signup;
