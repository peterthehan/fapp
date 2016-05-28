'use strict';

import React, {
  Alert,
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  Navigator,
  Text,
  TextInput,
  View,
} from 'react-native';

import Firebase from 'firebase';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Login from './login';
import SceneStyles from '../styles/scene-styles';
import TextStyles from '../styles/text-styles';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEmail: '',
      name: '',
      oldEmail: '',
      password: '',
      profilePic: '',
      newPic: '',
      user: '',
      newPW: '',
      curEmail: '',
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.logout = this.logout.bind(this);
    this.changeProfilePicture = this.changeProfilePicture.bind(this);
  }

  componentDidMount(){
    var self = this;

    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      self.setState({
        user: user_data,
      });
    });

    database.once("value", function(snapshot) {
      var usersnapshot = snapshot.child("users/" + self.props.state);
      self.setState({
        name: usersnapshot.val().firstName + " " + usersnapshot.val().lastName,
        oldEmail: usersnapshot.val().email,
        profilePic: usersnapshot.val().profilePic,
      });
    });
  }

  authorize(){
    database.authWithPassword({
      "email": this.state.curEmail,
      "password": this.state.password
    },
      (error, user_data) => {
        if(error) {
          Alert.alert('Error!', 'Authorize failed. Please try again.');
        } else {
          AsyncStorage.setItem('user_data', JSON.stringify(user_data));
          Alert.alert("Authorization succeed");
        }
      }
    );
  }

  render() {
    return (
      <View style = {SceneStyles.container}>
        <TitleBar
          hasBack = {true}
          navigator = {this.props.navigator}
          text = "Setting"
        />
        <View style = {{alignItems: 'center'}}>
          <Text> Please Authorize First</Text>
          <TextInput
            keyboardType = 'email-address'
            onChangeText = {(text) => this.setState({curEmail: text})}
            placeholder = {"Email"}
            placeholderTextColor = 'gray'
            style = {TextStyles.textInput}
            underlineColorAndroid = 'black'
            value = {this.state.curEmail}
          />
          <TextInput
            onChangeText = {(text) => this.setState({password: text})}
            placeholder = {"Password"}
            placeholderTextColor = 'gray'
            secureTextEntry = {true}
            style = {TextStyles.textInput}
            underlineColorAndroid = 'black'
            value = {this.state.password}
          />

          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.blackButtonText}
            onPress = {this.authorize.bind(this)}
            text = "authorize"
            underlayColor = {'#B18C40'}
          />
          <TextInput
            onChangeText = {(text) => this.setState({newEmail: text})}
            placeholder = {"Enter your new email address"}
            placeholderTextColor = 'gray'
            style = {SceneStyles.textInput}
            underlineColorAndroid = 'black'
            value = {this.state.newEmail}
          />

          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.blackButtonText}
            onPress = {this.changeEmail}
            text = "Change Email"
            underlayColor = {"#A2A2A2"}
          />

          <TextInput
            secureTextEntry={true}
            onChangeText = {(text) => this.setState({newPW: text})}
            placeholder = {"Enter your new password"}
            placeholderTextColor = 'gray'
            style = {SceneStyles.textInput}
            underlineColorAndroid = 'black'
            value = {this.state.newPW}
          />
          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.blackButtonText}
            onPress = {this.changePassword}
            text = "Change Password"
            underlayColor = {"#A2A2A2"}
          />

          <TextInput
            onChangeText = {(text) => this.setState({newPic: text})}
            placeholder = {"Enter your new profile picture URL"}
            placeholderTextColor = 'gray'
            style = {SceneStyles.textInput}
            underlineColorAndroid = 'black'
            value = {this.state.newPic}
          />
          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.blackButtonText}
            onPress = {this.changeProfilePicture}
            text = "Change Profile Picture"
            underlayColor = {"#A2A2A2"}
          />

          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.blackButtonText}
            onPress = {this.logout}
            text = "Logout"
            underlayColor = {"black"}
          />
        </View>
      </View>
    );
  }

  changeProfilePicture() {
    var ref = database.child("users");
    ref.child(this.state.user.uid).update({
      profilePic: this.state.newPic
    });
    Alert.alert('Success!', 'Profile picture has been changed. Please log out and log in again.');
  }

  changeEmail() {
    alert (this.state.user.provider);
    database.changeEmail({
      oldEmail: this.state.user.password.email,
      newEmail: this.state.newEmail,
      password: this.state.password
    }, function(error) {
      if(error) {
        switch(error.code) {
          case "INVALID_USER":
            Alert.alert('Error!', 'The specified user account does not exist.');
            break;
          default:
            Alert.alert('Error!', 'Error creating user.');
        }
      } else {
        Alert.alert('Success!', 'Email has been changed. Please log out and log in again.');
      }
    });
    var ref = database.child("users");
    ref.child(this.state.user.uid).update({
      email: this.state.newEmail
    });
  }

  changePassword() {

    database.changePassword({
      email: this.state.oldEmail,
      oldPassword: this.state.password,
      newPassword: this.state.newPW,
      }, function(error) {
        if(error === null) {
          Alert.alert('Success!', 'Password has been changed.');
        } else {
          Alert.alert('Error!', "Could not change password.");
        }
      });
  }

  logout() {
    AsyncStorage.removeItem('user_data').then(() => {
      database.unauth();
    });
  }
}

module.exports = Setting;
