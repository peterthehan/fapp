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

var ImagePickerManager = require('NativeModules').ImagePickerManager;

let database = new Firebase("poopapp1.firebaseio.com");

class ChangeProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: '',
      image: '',
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
    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if(response.didCancel) {
        console.log('User cancelled image picker');
      } else if(response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else {
        // You can display the image using either data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.setState({
          profilePic: source.uri,
          image: source,
        });
      }
    });
  }

  changeProfilePicture() {
    var ref = database.child("users");
    ref.child(database.getAuth().uid).update({
      profilePic: this.state.image,
    });
  }
}

const options = {
  allowsEditing: false, // Built in functionality to resize, reposition the image after selection
  angle: 0, // android only, photos only
  cameraType: 'front', // 'front' or 'back'
  cancelButtonTitle: 'Cancel',
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  durationLimit: 10, // video recording max time in seconds
  maxHeight: 370, // photos only
  maxWidth: 370, // photos only
  mediaType: 'photo', // 'photo' or 'video'
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  quality: 1, // 0 to 1, photos only
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  title: 'Select Avatar', // specify null or empty string to remove the title
  videoQuality: 'high', // 'low', 'medium', or 'high'
};

module.exports = ChangeProfilePicture;
