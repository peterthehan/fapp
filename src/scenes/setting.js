'use strict';

import React, {
  Alert,
  AsyncStorage,
  Component,
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
      email: '',
      name: '',
      oldEmail: '',
      password: '',
      profilePic: '',
      newPic: '',
      user: '',
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

  render() {
    return (
      <View style = {SceneStyles.container}>
        <TitleBar
          hasBack = {true}
          navigator = {this.props.navigator}
          text = "Setting"
        />
        <View style = {{alignItems: 'center'}}>
          <Text style = {TextStyles.blackText}>
             {this.state.name}
          </Text>
          <Text style = {TextStyles.blackText}>
             {this.state.oldEmail}
          </Text>
          <Image
            style = {{
              height: 40,
              width: 40,
            }}
            resizeMode = {Image.resizeMode.center}
            source = {{uri: this.state.profilePic}}
          />
          <TextInput
            onChangeText = {(text) => this.setState({email: text})}
            placeholder = {"Email"}
            placeholderTextColor = 'black'
            style = {SceneStyles.textInput}
            underlineColorAndroid = 'black'
            value = {this.state.email}
          />

          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.blackButtonText}
            onPress = {this.changeEmail}
            text = "Change Email"
            underlayColor = {"#A2A2A2"}
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
            placeholder = {"Picture URL"}
            placeholderTextColor = 'black'
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
            underlayColor = {"#A2A2A2"}
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
    database.changeEmail({
      oldEmail: this.state.user.password.email,
      newEmail: this.state.email,
      password: "1"
    }, function(error) {
      if(error) {
        switch(error.code) {
          case "INVALID_PASSWORD":
            Alert.alert('Error!', 'The specified user account password is incorrect.');
            break;
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
      email: this.state.email
    });
  }

  // TODO
  changePassword() {
    database.changePassword({
      email: this.state.user.password.email,
      oldPassword: "asdf",
      newPassword: "asdf"
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
