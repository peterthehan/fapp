'use strict';

import React, {
  Alert,
  Component,
  Image,
  View,
} from 'react-native';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class ChangeProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getEmail();
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          hasBack = {"true"}
          navigator = {this.props.navigator}
          text = "Change Your Profile Picture"
        />

        <Button
          buttonStyles = {ButtonStyles.transparentButton}
          buttonTextStyles = {ButtonStyles.blackButtonText}
          onPress = {this.changeProfilePicture.bind(this)}
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

  changeProfilePicture() {

  }
}

module.exports = ChangeProfilePicture;
