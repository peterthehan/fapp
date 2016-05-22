'use strict';

import React, {
  Alert,
  AsyncStorage,
  Component,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import Firebase from 'firebase';

import TitleBar from '../components/title-bar';
import Button from '../components/button';

import SceneStyles from '../styles/scene-styles';

import Login from './login';
import Home from './home';

let database = new Firebase("poopapp1.firebaseio.com");

class Setting extends Component {
  constructor(props) {
    super(props);
    var self = this;

    database.once("value", function(snapshot){
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
        loaded: true
      });
    });
    return(
      <View>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Setting"
          loaded = {this.state.loaded}
          hasBack = {true}
        />
        <View>
        {
          this.state.user &&
            <View style = {SceneStyles.body}>
              <View style = {styles.container}>
                <Text style = {{fontSize: 20, color: '#000000',}}>
                   {this.state.name}
                </Text>
                <Text style = {styles.emailText}>
                   {this.state.oldEmail}
                </Text>
                <TextInput
                  placeholder = {"email"}
                  onChangeText = {(text) => this.setState({email: text})}
                  value = {this.state.email}
                  style = {SceneStyles.firstName}
                  placeholderTextColor = '#000'
                  underlineColorAndroid = '#FFF'
                />
                {this.changeEmailButton()}
                <Image
                  style={SceneStyles.image}
                  source={{uri: this.state.profilePic}}
               />
              </View>
                {this.logoutButton()}
            </View>
        }
        </View>
      </View>
    );
  }

  logout() {
    AsyncStorage.removeItem('user_data').then(() => {
      database.unauth();
    });
  }

  logoutButton() {
    return (
      <TouchableHighlight
        onPress = {this.logout}
        underlayColor='lemonchiffon'>

        <Text style = {{
          color: '#000',
          fontSize: 16,
          textAlign: 'center'}}>
          logout
        </Text>
      </TouchableHighlight>
    );
  }

  /*TODO*/
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

  changePasswordButton() {
    return (
      <TouchableHighlight
        onPress = {this.changePassword}
        underlayColor = 'lemonchiffon'>

        <Text style = {{
          color: '#000',
          fontSize: 16,
          textAlign: 'center'}}>
          change password
        </Text>
      </TouchableHighlight>
    )
  }

  changeProfilePicture() {
  }

  changeProfilePictureButton() {
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

  changeEmailButton() {
    return (
      <TouchableHighlight
        onPress = {this.changeEmail}
        underlayColor = 'lemonchiffon'>

        <Text style = {{
          color: 'black',
          fontSize: 16,
          textAlign: 'center'}}>
          change email
        </Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  emailText: {
    fontSize: 18
  }
});

module.exports = Setting;
