'use strict';

import React, {
  Component,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Image,
  AsyncStorage,
  View
} from 'react-native';

import Firebase from 'firebase';
import SceneStyles from '../styles/scene-styles';
import Header from '../components/header';
import Button from '../components/button';
import Login from './login';

let database = new Firebase("poopapp1.firebaseio.com");

class Setting extends Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  logout(){
      AsyncStorage.removeItem('user_data').then(() => {
        database.unauth();
        this.props.navigator.resetTo(this.refs.navigator.getCurrentRoutes()[0]);
      });
  }

  logoutbutton(){
    return (
      <TouchableHighlight onPress = {this.logout.bind(this)} underlayColor='lemonchiffon'>
        <Text style = {{color: 'black',
        fontSize: 16,
        textAlign: 'center'}}>
          logout
        </Text>
      </TouchableHighlight>
    );
  }
  /*Todo*/
  changePassword(){
  }

  changeEmail(){
    database.changeEmail({
      oldEmail: this.state.user.password.email,
      newEmail: "email@mail.com",
      password: "t"
    }, function(error) {
    if (error) {
      switch (error.code) {
        case "INVALID_PASSWORD":
          alert ("The specified user account password is incorrect.");
          break;
        case "INVALID_USER":
          alert ("The specified user account does not exist.");
          break;
        default:
          alert ("Error creating user:", error);
      }
    } else {
        alert("User email changed successfully!");
      }
    });
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
          loaded={this.state.loaded}
          hasBack = {true}
        />
        <View>
        {
          this.state.user &&
            <View style={SceneStyles.body}>
              <View style={page_styles.email_container}>
                <Text style={page_styles.email_text}>{this.state.user.password.email}
                </Text>
                <TextInput
                  placeholder = {"email"}
                  onChangeText = {(text) => this.setState({email: text})}
                  value = {this.state.email}
                  style = {SceneStyles.firstName}
                  placeholderTextColor = 'black'
                  underlineColorAndroid = 'white'
                />
                <TouchableHighlight onPress = {this.changeEmail.bind(this)} underlayColor='lemonchiffon'>
                  <Text style = {{color: 'black',
                  fontSize: 16,
                  textAlign: 'center'}}>
                    change email
                  </Text>
                </TouchableHighlight>
                <Image
                  style={SceneStyles.image}
                  source={{uri: this.state.user.password.profileImageURL}}
               />
                <Text style={page_styles.email_text}>{this.state.user.token}
                </Text>
              </View>
                {this.logoutbutton()}
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
