'use strict';

import React, {
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

import Header from '../components/header';
import Button from '../components/button';

import SceneStyles from '../styles/scene-styles';

import Login from './login';
import Home from './home';

let database = new Firebase("poopapp1.firebaseio.com");

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      email: '',
      password: '',
      passwordConfirm: ''
    };
    this.logout = this.logout.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  logout(){
    AsyncStorage.removeItem('user_data').then(() => {
      database.unauth();
    });
  }

  logoutButton(){
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
  changePassword(){
    database.changePassword({
      email: this.state.user.password.email,
      oldPassword: "asdf",
      newPassword: "asdf"
      }, function(error) {
      if(error === null) {
        alert("Password changed successfully!");
      } else {
        alert("Error changing password.", error);
      }
    });
  }

  changePasswordButton(){
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

  changeEmail(){
    database.changeEmail({
      oldEmail: this.state.user.password.email,
      newEmail: "email@mail.com",
      password: "t"
      }, function(error) {
      if(error) {
        switch(error.code) {
          case "INVALID_PASSWORD":
            alert ("The specified user account password is incorrect.");
            break;
          case "INVALID_USER":
            alert ("The specified user account does not exist.");
            break;
          default:
            alert ("Error creating user.", error);
        }
      } else {
        alert("Email changed successfully!");
      }
    });
  }

  changeEmailButton(){
    return (
      <TouchableHighlight
        onPress = {this.changeEmail}
        underlayColor = 'lemonchiffon'>

        <Text style = {{
          color: '#000',
          fontSize: 16,
          textAlign: 'center'}}>
          change email
        </Text>
      </TouchableHighlight>
    )
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
        <Header
          navigator = {this.props.navigator}
          text = "Setting"
          loaded = {this.state.loaded}
          hasBack = {true}
        />
        <View>
        {
          this.state.user &&
            <View style = {SceneStyles.body}>
              <View style = {page_styles.email_container}>
                <Text style = {page_styles.email_text}>
                  {this.state.user.password.email}
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
                  style = {SceneStyles.image}
                  source = {{uri: this.state.user.profileImageURL}}
                />
                <Text style = {page_styles.email_text}>
                  {this.state.user.token}
                </Text>
              </View>
                {this.logoutButton()}
            </View>
        }
        </View>
      </View>
    );
  }
}

const page_styles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});

module.exports = Setting;
