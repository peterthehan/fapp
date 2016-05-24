'use strict';

import React, {
  Alert,
  AsyncStorage,
  Component,
  Image,
  Navigator,
  Text,
  TextInput,
  View
} from 'react-native';

import Firebase from 'firebase';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Home from './home';
import Login from './login';
import SceneStyles from '../styles/scene-styles';
import TextStyles from '../styles/text-styles';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class Setting extends Component {
  constructor(props) {
    super(props);
    var self = this;

    database.once("value", function(snapshot) {
      var usersnapshot = snapshot.child("users/" + props.state);
      var proPic = usersnapshot.val().profilePic;
      var emailaddress = usersnapshot.val().email;
      self.setState({
        name: usersnapshot.val().firstName + " " + usersnapshot.val().lastName,
        profilePic: proPic,
        oldEmail: emailaddress,
      });
    });

    this.state = {
      name: "",
      oldEmail: "",
      email: "",
      password: "",
      profilePic: "",
    };
    this.logout = this.logout.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  render() {
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      this.setState({
        user: user_data,
      });
    });

    return(
      <View style = {SceneStyles.container}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Setting"
          hasBack = {true}
        />
        <View>
        {
          this.state.user &&
            <View style = {SceneStyles.container}>
              <Image
                source = {{uri: this.state.profilePic}}
                style = {SceneStyles.image}
              />

              <Text style = {TextStyles.blackText}>
                 {this.state.name}
              </Text>
              <Text style = {TextStyles.blackText}>
                 {this.state.oldEmail}
              </Text>

              <TextInput
                placeholder = {"Email"}
                onChangeText = {(text) => this.setState({email: text})}
                value = {this.state.email}
                style = {SceneStyles.textInput}
                placeholderTextColor = 'black'
                underlineColorAndroid = 'black'
              />

              <Button
                text = "Change Email"
                onPress = {this.changeEmail.bind(this)}
                buttonStyles = {ButtonStyles.transparentButton}
                buttonTextStyles = {ButtonStyles.blackButtonText}
                underlayColor = {"#A2A2A2"}
              />
              <Button
                text = "Change Password"
                onPress = {this.changePassword.bind(this)}
                buttonStyles = {ButtonStyles.transparentButton}
                buttonTextStyles = {ButtonStyles.blackButtonText}
                underlayColor = {"#A2A2A2"}
              />
              <Button
                text = "Logout"
                onPress = {this.logout.bind(this)}
                buttonStyles = {ButtonStyles.transparentButton}
                buttonTextStyles = {ButtonStyles.blackButtonText}
                underlayColor = {"#A2A2A2"}
              />
            </View>
        }
        </View>
      </View>
    );
  }

  changeProfilePicture() {
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
