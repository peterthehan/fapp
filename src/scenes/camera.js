'use strict';

import React, {
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToolbarAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import { Surface } from 'gl-react-native';
var ImagePickerManager = require('NativeModules').ImagePickerManager;

import PostDetails from './post-details';
import Saturation from '../components/saturation';
import Vignette from '../components/vignette';
import Instagram from '../components/instagram';

var length = Dimensions.get('window').width;

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      test: 'help',
      length: length,
      filter: null
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
    var filter;
    switch (this.state.filter) {
      case "sat":
        filter = this.monoImage();
        break;
      case "vign":
        filter = this.vignetteImage();
        break;
      case "ig":
        filter = this.igImage();
        break;
      default:
        filter = this.ogImage();
        break;
    }
    return (
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

        <Surface width = {this.state.length} height = {this.state.length} >
        {filter}
        </Surface>

        <View style = {{flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>

        <Text
          style = {{color: 'black', marginTop: 10, flex: 1}}>
          Original
        </Text>

        <TouchableOpacity onPress ={()=> this.setState({filter: null})} style = {{flex: 1}}>
          <Surface width = {40} height = {40}>
            {this.ogImage()}
          </Surface>
        </TouchableOpacity>

        <Text
          style = {{color: 'black', marginTop: 10, flex: 1}}>
          Monochrome
        </Text>

        <TouchableOpacity onPress = {()=> this.setState({filter: 'sat'})} style = {{flex: 1}}>
          <Surface width = {40} height = {40} >
            {this.monoImage()}
          </Surface>
        </TouchableOpacity>

        <Text
          style = {{color: 'black', marginTop: 10, flex: 1}}>
          Vignette
        </Text>

        <TouchableOpacity onPress = {()=> this.setState({filter: 'vign'})} style = {{flex: 1}}>
          <Surface width = {40} height = {40} >
            {this.vignetteImage()}
          </Surface>
        </TouchableOpacity>

        <Text
          style = {{color: 'black', marginTop: 10, flex: 1}}>
          Multi-purpose filter
        </Text>

        <TouchableOpacity onPress = {()=> this.setState({filter: 'ig'})} style = {{flex: 1}}>
          <Surface width = {40} height = {40} >
            {this.igImage()}
          </Surface>
        </TouchableOpacity>

        </View>
        </View>

    );
  }

  ogImage() {
    return(
      <Image source = {this.state.avatarSource}
      style = {{flex: 1}}/>
    );
  }

  monoImage() {
    return(<Saturation
      factor = {0}
      image = {this.state.avatarSource}
      style = {{flex: 1}}
    />);
  }

  vignetteImage() {
    var secondSource = this.state.avatarSource;
    return (<Vignette
      time = {0.2}
      texture = {secondSource}
      style = {{flex: 1}}
    />
    );
  }

  igImage() {
    var thirdSource = this.state.avatarSource;
    return (
        <Instagram
          brightness = {1}
          saturation = {1}
          contrast = {1}
          hue = {0}
          sepia = {1}
          gray = {0}
          mixFactor = {0}
          tex = {thirdSource}
        />
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
      this.props.navigator.push({component: PostDetails, state: this.state.avatarSource});
    } else if (position == 1) {
      this.openCamera();
    }
  }

  render() {
    if ( this.state.avatarSource)
      {return this.renderImage();}
    else
      {return this.renderBars();}
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
