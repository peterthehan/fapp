'use strict';

import React, {
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToolbarAndroid,
  View,
} from 'react-native';

import Slider from 'react-native-slider';
import { Surface, GL } from 'gl-react-native';
var ImagePickerManager = require('NativeModules').ImagePickerManager;

import PostDetails from './post-details';
import Saturation from '../components/saturation';

var length = Dimensions.get('window').width;

class Camera extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      test: 'help',
      length: length
    };
  }

  openCamera() {
    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else {
        // You can display the image using either data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.setState({
          avatarSource: source
        });
      }
    });
  }

  renderImage() {
    return (
      <View>
        <View>
          <ToolbarAndroid
            title = 'Create a Post'
            style = {styles.toolbar}
            actions = {[
              {title: 'Details', show: 'always'},
              {title: 'Camera', show: 'always'}
            ]}
            onActionSelected = {this.onActionSelected.bind(this)}
          />
        </View>

        <Surface
          width = {this.state.length}
          height = {this.state.length}
          ref = "helloGL"
        >
          <Saturation
            factor = {this.state.value}
            image={this.state.avatarSource}
          />
        </Surface>

        <Text
          style = {{color: 'black', marginTop: 10}}>
          Saturation
        </Text>

        <Slider
          value = {this.state.value}
          maximumValue = {3}
          onValueChange = {(value) => this.setState({value})}
        />
      </View>
    );
  }

  renderBars() {
    return(
      <View>
        <ToolbarAndroid
          title = 'Create a Post'
          style = {styles.toolbar}
          actions ={[
            {title: 'Details', show: 'always'},
            {title: 'Camera', show: 'always'}
          ]}

          onActionSelected = {this.onActionSelected.bind(this)}
        />
      </View>
    );
  }

  onActionSelected(position) {
    if (position == 0) {
      this.props.navigator.push({component: PostDetails});
    } else if (position == 1) {
      this.openCamera();
    }
  }

  render() {
    return this.renderImage();
  }

}

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: '#4682b4',
  }
});

var options = {
  title: 'Select Avatar', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 370, // photos only
  maxHeight: 370, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 1, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize, reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
};

module.exports = Camera;
