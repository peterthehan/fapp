'use strict';

import React, {
  Alert,
  Component,
  DatePickerAndroid,
  Image,
  TextInput,
  View
} from 'react-native';

import Firebase from 'firebase';
import DismissKeyboard from 'react-native-dismiss-keyboard';

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
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
            />
            <TextInput
              placeholder = {"Last Name"}
              onChangeText = {(text) => this.setState({lastName: text})}
              value = {this.state.lastName}
              style = {TextStyles.rightTextInput}
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
            />
          </View>

          <TextInput
            placeholder = {"Date of Birth"}
            value = {this.state.dateOfBirth}
            style = {TextStyles.textInput}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'
            onFocus = {this.showDatePicker.bind(this)}
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
          <TextInput
            placeholder = {"Confirm Password"}
            onChangeText = {(text) => this.setState({passwordConfirm: text})}
            value = {this.state.passwordConfirm}
            style = {TextStyles.textInput}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'
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

  async showDatePicker() {
    DismissKeyboard();
    try {
      const {action, year, month, day} = await DatePickerAndroid.open();
      if(action !== DatePickerAndroid.dismissedAction) {
        var tempDate = new Date(year, month, day);
        var tempDateStr = tempDate.toLocaleDateString();

        this.setState({dateOfBirth: tempDateStr});
        this.setNativeProps({dateOfBirth: tempDateStr});
      }
    } catch({code, message}) {
      console.warn('Cannot open date picker.', message);
    }
  }

  signup() {
    if(this.state.firstName === "") {
      Alert.alert('', 'Enter your first name.');
    } else if(this.state.lastName === "") {
      Alert.alert('', 'Enter your last name.');
    } else if(this.state.dateOfBirth === "") {
      Alert.alert('', 'Enter your date of birth.');
    } else if(this.state.email === "") {
      Alert.alert('', 'Enter your email.');
    } else if(this.state.password === "") {
      Alert.alert('', 'Enter your password.');
    } else if(this.state.passwordConfirm === "") {
      Alert.alert('', 'Confirm your password.');
    } else if(this.state.password != this.state.passwordConfirm) {
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
                Alert.alert('Error!', 'Error creating user.');
            }
          } else {
            var ref = database.child("users");
            var uid = userData.uid;
            ref.child(uid).set({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              dateOfBirth: this.state.dateOfBirth,
              email: this.state.email,
              profilePic: "http://icons.iconarchive.com/icons/graphicloads/food-drink/256/egg-icon.png",
            });
            Alert.alert('Success!', 'Your account was created!');
            this.props.navigator.pop();

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
