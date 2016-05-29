'use strict';

import React, {
  Alert,
  Component,
  Image,
  TextInput,
  View,
} from 'react-native';

import DismissKeyboard from 'react-native-dismiss-keyboard';
import Firebase from 'firebase';

import AppBar from '../components/app-bar';
import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Login from './login';
import SceneStyles from '../styles/scene-styles';
import TextStyles from '../styles/text-styles';

let database = new Firebase("poopapp1.firebaseio.com");

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
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
              onChangeText = {(text) => this.setState({firstName: text})}
              placeholder = {"First Name"}
              placeholderTextColor = 'white'
              style = {TextStyles.leftTextInput}
              underlineColorAndroid = 'white'
              value = {this.state.firstName}
            />
            <TextInput
              onChangeText = {(text) => this.setState({lastName: text})}
              placeholder = {"Last Name"}
              placeholderTextColor = 'white'
              style = {TextStyles.rightTextInput}
              underlineColorAndroid = 'white'
              value = {this.state.lastName}
            />
          </View>

          <TextInput
            keyboardType = 'email-address'
            onChangeText = {(text) => this.setState({email: text})}
            placeholder = {"Email"}
            placeholderTextColor = 'white'
            style = {TextStyles.whiteTextInput}
            underlineColorAndroid = 'white'
            value = {this.state.email}
          />
          <TextInput
            onChangeText = {(text) => this.setState({password: text})}
            placeholder = {"Password"}
            placeholderTextColor = 'white'
            secureTextEntry = {true}
            style = {TextStyles.whiteTextInput}
            underlineColorAndroid = 'white'
            value = {this.state.password}
          />
          <TextInput
            onChangeText = {(text) => this.setState({passwordConfirm: text})}
            placeholder = {"Confirm Password"}
            placeholderTextColor = 'white'
            secureTextEntry = {true}
            style = {TextStyles.whiteTextInput}
            underlineColorAndroid = 'white'
            value = {this.state.passwordConfirm}
          />

          <Button
            buttonStyles = {ButtonStyles.primaryButton}
            buttonTextStyles = {ButtonStyles.whiteButtonText}
            onPress = {this.signup.bind(this)}
            text = "SIGN UP"
            underlayColor = {'#B18C40'}
          />
          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.whiteButtonText}
            onPress = {this.goToLogin.bind(this)}
            text = "Already Have An Account"
            underlayColor = {'gray'}
          />
        </Image>
      </View>
    );
  }


  signup() {
    if(this.state.firstName === "") {
      Alert.alert('', 'Enter your first name.');
    } else if(this.state.lastName === "") {
      Alert.alert('', 'Enter your last name.');
    } else if(this.state.email === "") {
      Alert.alert('', 'Enter your email.');
    } else if(this.state.password === "") {
      Alert.alert('', 'Enter your password.');
    } else if(this.state.passwordConfirm === "") {
      Alert.alert('', 'Confirm your password.');
    } else if(this.state.password !== this.state.passwordConfirm) {
      Alert.alert('Error!', 'The specified passwords do not match.');
    } else {
      database.createUser({
        'email': this.state.email,
        'password': this.state.password
        }, (error, userData) => {
          if(error) {
            switch(error.code) {
              case "EMAIL_TAKEN":
                Alert.alert('Error!', 'The new user account cannot be created because the email is already in use.');
              break;
              case "INVALID_EMAIL":
                Alert.alert('Error!', 'The specified email is not a valid email.');
              break;
              default:
                Alert.alert('Error!', 'Error creating user account.');
            }
          } else {
            var ref = database.child("users");
            var uid = userData.uid;
            ref.child(uid).set({
              email: this.state.email,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              profilePic: "http://icons.iconarchive.com/icons/graphicloads/food-drink/256/egg-icon.png",
            });
            Alert.alert('Success!', 'Your account was created!');
            this.props.navigator.pop();

            this.setState({
              email: '',
              firstName: '',
              lastName: '',
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
