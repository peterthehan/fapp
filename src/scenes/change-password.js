'use strict';

import React, {
  Alert,
  Component,
  TextInput,
  View,
} from 'react-native';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import TextStyles from '../styles/text-styles';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: '',
      email: '',
      newPassword: '',
      oldPassword: '',
    };
    this.getEmail();
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          hasBack = {"true"}
          navigator = {this.props.navigator}
          text = "Change Your Password"
        />

        <TextInput
          onChangeText = {(text) => this.setState({oldPassword: text})}
          placeholder = {"Old Password"}
          placeholderTextColor = 'gray'
          secureTextEntry = {true}
          style = {{
            color: 'black',
            height: 36,
            marginBottom: 32,
            marginLeft: 16,
            marginRight: 16,
            marginTop: 14,
          }}
          underlineColorAndroid = 'black'
          value = {this.state.oldPassword}
        />
        <TextInput
          onChangeText = {(text) => this.setState({newPassword: text})}
          placeholder = {"New Password"}
          placeholderTextColor = 'gray'
          secureTextEntry = {true}
          style = {TextStyles.blackTextInput}
          underlineColorAndroid = 'black'
          value = {this.state.newPassword}
        />
        <TextInput
          onChangeText = {(text) => this.setState({confirmPassword: text})}
          placeholder = {"Confirm Password"}
          placeholderTextColor = 'gray'
          secureTextEntry = {true}
          style = {TextStyles.blackTextInput}
          underlineColorAndroid = 'black'
          value = {this.state.confirmPassword}
        />

        <Button
          buttonStyles = {ButtonStyles.transparentButton}
          buttonTextStyles = {ButtonStyles.blackButtonText}
          onPress = {this.changePassword.bind(this)}
          text = "Submit"
          underlayColor = {'gray'}
        />

      </View>
    );
  }

  getEmail() {
    database.once("value",
      (snapshot) => {
        var user = snapshot.child("users/" + database.getAuth().uid);
        this.setState({
          oldEmail: user.val().email
        });
      }
    );
  }

  changePassword() {
    if(this.state.oldPassword === "") {
      Alert.alert('', 'Enter your old password.');
    } else if(this.state.newPassword === "") {
      Alert.alert('', 'Enter your new password.');
    } else if(this.state.confirmPassword === "") {
      Alert.alert('', 'Confirm your new password.');
    } else if(this.state.newPassword !== this.state.confirmPassword) {
      Alert.alert('Error!', 'The specified passwords do not match.');
    } else {
      database.changePassword({
        email: this.state.email,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      }, (error) => {
        if(error) {
          switch(error.code) {
            case "INVALID_PASSWORD":
              Alert.alert('Error!', 'The specified user account password is incorrect.');
              break;
            default:
              Alert.alert('Error!', 'Error changing user password.');
          }
        } else {
          Alert.alert('Success!', 'User password was changed.');
        }
      });
    }
    this.setState({
      confirmPassword: '',
      newPassword: '',
      oldPassword: '',
    });
  }
}

module.exports = ChangePassword;
