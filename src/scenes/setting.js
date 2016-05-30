'use strict';

import React, {
  AsyncStorage,
  Component,
  StyleSheet,
  View,
} from 'react-native';

import Button from '../components/button';
import ChangeEmail from './change-email';
import ChangePassword from './change-password';
import ChangeProfilePicture from './change-profile-picture';
import Login from './login';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          hasBack = {"true"}
          navigator = {this.props.navigator}
          text = "Settings"
        />
        <Button
          buttonStyles = {{}}
          buttonTextStyles = {styles.buttonStyle}
          onPress = {this.changeProfilePicture.bind(this)}
          text = "Change your profile picture"
          underlayColor = {'gray'}
        />
        <Button
          buttonStyles = {{}}
          buttonTextStyles = {styles.buttonStyle}
          onPress = {this.changeEmail.bind(this)}
          text = "Change your email"
          underlayColor = {'gray'}
        />
        <Button
          buttonStyles = {{}}
          buttonTextStyles = {styles.buttonStyle}
          onPress = {this.changePassword.bind(this)}
          text = "Change your password"
          underlayColor = {'gray'}
        />
        <Button
          buttonStyles = {{}}
          buttonTextStyles = {styles.buttonStyle}
          onPress = {this.logout.bind(this)}
          text = "Logout"
          underlayColor = {'gray'}
        />
      </View>
    );
  }
  changeProfilePicture() {
    this.props.navigator.push({component: ChangeProfilePicture});
  }

  changeEmail() {
    this.props.navigator.push({component: ChangeEmail});
  }

  changePassword() {
    this.props.navigator.push({component: ChangePassword});
  }

  logout() {
    AsyncStorage.removeItem('user_data').then(() => {
      database.unauth();
    });
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'stretch',
    fontSize: 18,
    margin: 14,
    textAlign: 'left',
  },
});

module.exports = Setting;
