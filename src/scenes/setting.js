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
      newPic: "",
      password: "",
      profilePic: "",
    };
    this.logout = this.logout.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }



  logout(){
    AsyncStorage.removeItem('user_data').then(() => {
      database.unauth();
    });
    this.props.navigator.push({component: Home});
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
      oldPassword: this.state.user.password,
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
    );
  }

  changeProfilePicture(){
    var req = database.child("users");
    req.child(this.state.user.uid).update({
      profilePic: this.state.newPic
    });
  }

  changeProfilePictureButton(){
    return (
      <TouchableHighlight
        onPress = {this.changeProfilePicture}
        underlayColor = 'lemonchiffon'>
        <Text style = {{
          color: '#000',
          fontSize: 16,
          textAlign: 'center'}}>
          change profile picture
        </Text>
      </TouchableHighlight>
    );
  }

  picture(){
    return(
     <TextInput
       placeholder = {"please enter picture URL"}
       onChangeText = {(text) => this.setState({newPic: text})}
       value = {this.state.newPic}
       style = {SceneStyles.firstName}
       placeholderTextColor = '#000'
       underlineColorAndroid = '#FFF'
     />
   );
  }

  changeEmail(){
    database.changeEmail({
      oldEmail: this.state.user.password.email,
      newEmail: this.state.email,
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
    var ref = database.child("users");
    ref.child(this.state.user.uid).update({
      email: this.state.email
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
    );
  }

  email(){
    return(
      <TextInput
        placeholder = {"email"}
        onChangeText = {(text) => this.setState({email: text})}
        value = {this.state.email}
        style = {SceneStyles.firstName}
        placeholderTextColor = '#000'
        underlineColorAndroid = '#FFF'
      />
    );
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
                <Text>
                   {this.state.name}
                </Text>
                <Text style = {page_styles.email_text}>
                   {this.state.oldEmail}
                </Text>
                {this.email()}
                {this.changeEmailButton()}
                <Image
                  style={SceneStyles.image}
                  source={{uri: this.state.profilePic}}
               />
                {this.picture()}
                {this.changeProfilePictureButton()}
                {this.changePasswordButton()}
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
