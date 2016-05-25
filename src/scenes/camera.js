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

import {Surface} from 'gl-react-native';

import Instagram from '../components/instagram';
import PostDetails from './post-details';
import Saturation from '../components/saturation';
import Vignette from '../components/vignette';

var ImagePickerManager = require('NativeModules').ImagePickerManager;
var filteredPic = null;
var length = Dimensions.get('window').width;
var filterSize = 60;

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      filter: null,
      // filteredPic: null,
      length: length,
      test: 'help',
    };
    this.onCapture1 = this.onCapture1.bind(this);
  }

  onCapture1() {
    this.refs.surfacePic.captureFrame().then(data64 => {
      filteredPic = data64;
    });
  }

  openCamera() {
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
          avatarSource: source,
        });

      }
    });
  }

  renderImage() {
    var filter;
    switch(this.state.filter) {
      case "sat":
        filter = this.monoImage();
        break;
      case "filter1":
        filter = this.filter1Image();
        break;
      case "ig":
        filter = this.igImage();
        break;
      case "test":
        filter = this.testImage();
        break;
      default:
        filter = this.ogImage();
        break;
    }
    return (
      <View>
      <View style = {{flex: 1, flexDirection: 'column'}}>
        <View style = {styles.titleBar, {padding: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: '#F26D6A'}}>
          <View style = {{flex: 1}}>
            {this.cameraButton()}
          </View>
          <View style = {{flex: 2}}>
            <Text style = {styles.titleBarText}>
              Create a Post
            </Text>
          </View>
          <View style = {{flex: 1}}>
            {this.detailsButton()}
          </View>
        </View>
        </View>

        <View style = {{marginTop:3, marginLeft: 3, marginRight: 5, marginBottom: 10, borderColor: 'black', borderWidth: 1}}>
          <Surface width = {this.state.length - 3} height = {this.state.length - 3} ref = "surfacePic">
            {filter}
          </Surface>
        </View>

        <View style = {{flex: 1, flexDirection: "row", justifyContent: "space-around" }}>

          <View style = {styles.filterButton}>
          <TouchableOpacity onPress ={()=> this.setFilterAndCapture(null)} >
            <Surface width = {filterSize} height = {filterSize}>
              {this.ogImage()}
            </Surface>
          </TouchableOpacity>
          </View>

          <View style = {styles.filterButton}>
          <TouchableOpacity onPress = {()=> this.setFilterAndCapture('sat')} >
            <Surface width = {filterSize} height = {filterSize} >
              {this.monoImage()}
            </Surface>
          </TouchableOpacity>
          </View>

          <View style = {styles.filterButton}>
          <TouchableOpacity onPress = {()=> this.setFilterAndCapture('filter1')} >
            <Surface width = {filterSize} height = {filterSize} >
              {this.filter1Image()}
            </Surface>
          </TouchableOpacity>
          </View>

          <View style = {styles.filterButton}>
          <TouchableOpacity onPress = {()=> this.setFilterAndCapture('ig')} >
            <Surface width = {filterSize} height = {filterSize} >
              {this.igImage()}
            </Surface>
          </TouchableOpacity>
          </View>

          <View style = {styles.filterButton}>
          <TouchableOpacity onPress = {()=> this.setFilterAndCapture('test')} >
            <Surface width = {filterSize} height = {filterSize} >
              {this.testImage()}
            </Surface>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  setFilterAndCapture(filt) {
    this.setState({filter: filt});
    setTimeout(() => {this.onCapture1();},300);
  }

  ogImage() {
    return(
      <Image source = {this.state.avatarSource}
      style = {{flex: 1}}/>
    );
  }

  monoImage() {
    return(
      <Saturation
        factor = {0}
        image = {this.state.avatarSource}
        style = {{flex: 1}}
      />
    );
  }

  filter1Image() {
    return (<Instagram
      brightness = {1}
      saturation = {1}
      contrast = {.6}
      hue = {.5}
      sepia = {.5}
      gray = {.1}
      mixFactor = {0}
      tex = {this.state.avatarSource}
    />
    );
  }

  igImage() {
    return (
      <Instagram
        brightness = {1}
        contrast = {1}
        gray = {0}
        hue = {0}
        mixFactor = {0}
        saturation = {1}
        sepia = {1}
        tex = {this.state.avatarSource}
      />
    );
  }

  testImage() {
    return (
        <Instagram
          brightness = {1}
          saturation = {1}
          contrast = {1.5}
          hue = {.25}
          sepia = {.25}
          gray = {0}
          mixFactor = {.25}
          tex = {this.state.avatarSource}
        />
    );
  }

  renderBars() {
    return (
      <View style = {{flex: 1}}>
        <View style = {styles.titleBar}>
          <View style = {{flex: 1}}>
            {this.cameraButton()}
          </View>
          <View style = {{flex: 2}}>
            <Text style = {styles.titleBarText}>
              Create a Post
            </Text>
          </View>
          <View style = {{flex: 1}}>
            {this.detailsButton()}
          </View>
        </View>
      </View>
    );
  }

  detailsButton() {
    return (
      <TouchableOpacity
        style = {styles.button, {alignItems: 'flex-end'}}
        onPress = {this.onActionSelected.bind(this)}>
        <Text style = {{color: 'white'}}>
          Details
        </Text>
      </TouchableOpacity>
    );
  }

  cameraButton() {
    return (
      <TouchableOpacity
        onPress = {() => {this.openCamera()}}
        style = {styles.button}>
        <Text style = {{color: 'white'}}>
          Camera
        </Text>
      </TouchableOpacity>
    );
  }

  onActionSelected() {
    var photoIDObj;
    if(filteredPic) {
      photoIDObj = {
        uri: filteredPic,
        isStatic: true,
      }
    } else {
      photoIDObj = this.state.avatarSource;
    }
    this.props.navigator.push({component: PostDetails, state: photoIDObj});
  }

  render() {
    if(this.state.avatarSource) {
      return this.renderImage();
    } else {
      return this.renderBars();
    }
  }
}

const styles = StyleSheet.create({
  button: {
  },
  titleBar: {
    alignItems: 'center',
    backgroundColor: '#F26D6A',
    flex: 3,
    flexDirection: 'row',
    left: 0,
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  titleBarText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  filterButton: {
  },
});

const options = {
  allowsEditing: false, // Built in functionality to resize, reposition the image after selection
  angle: 0, // android only, photos only
  cameraType: 'back', // 'front' or 'back'
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

module.exports = Camera;
