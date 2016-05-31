'use strict';

import React, {
  Alert,
  Component,
  Dimensions,
  Text,
  Image,
  View,
} from 'react-native';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import TextStyles from '../styles/text-styles';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class ChangeProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: ''
    };
  }

  componentDidMount() {
    this.getProfilePicture();
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          hasBack = {"true"}
          navigator = {this.props.navigator}
          text = "Change Your Profile Picture"
        />

        <Text style = {{marginTop: 14, marginLeft: 20}}>
          Current Profile Picture
        </Text>

        <View style = {{padding: 8, alignItems: 'center'}}>
          <Image
            source = {{uri: this.state.profilePic}}
            style = {{
              height: Dimensions.get("window").width / 4,
              width: Dimensions.get("window").width / 4,
            }}>
          </Image>
        </View>

        <Button
          buttonStyles = {ButtonStyles.transparentButton}
          buttonTextStyles = {ButtonStyles.blackButtonText}
          onPress = {this.getNewProfilePicture.bind(this)}
          text = "New Profile Picture"
          underlayColor = {'gray'}
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

  getProfilePicture() {
    database.child("users/" + database.getAuth().uid + "/profilePic").once("value",
      (snapshot) => {
        this.setState({
          profilePic: snapshot.val().uri
        });
      }
    );
  }

  getNewProfilePicture() {

  }

  changeProfilePicture() {

  }
}

module.exports = ChangeProfilePicture;
