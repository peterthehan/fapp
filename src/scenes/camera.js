'use strict';

import React, {
  Component,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  ToolbarAndroid,
  TouchableOpacity,
  View,
  AsyncStorage,
  TextInput,
} from 'react-native';

import {Surface} from 'gl-react-native';
import ActionButton from 'react-native-action-button';
import Firebase from 'firebase';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Instagram from '../components/instagram';
import Saturation from '../components/saturation';
import TextStyles from '../styles/text-styles';
import TimeStamp from '../util/time-stamp';
import TitleBar from '../components/title-bar';
import Vignette from '../components/vignette';

let database = new Firebase("poopapp1.firebaseio.com");
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var filteredPic = null;
var length = Dimensions.get('window').width;
var filterSize = 40;

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      location: '',
      recipe: '',
      avatarSource: null,
      filter: null,
      length: length,
      test: 'help',
      tags: [],
    };
    this.onCapture1 = this.onCapture1.bind(this);
  }

  post() {
    var self = this;
    AsyncStorage.getItem('user_data', (error, result) => {
      var usid = JSON.parse(result).uid;
      var ref = database.child("posts");
      var postList = database.child("users/" + usid + "/postList");
      database.once("value", function(snapshot){
        var usersnapshot = snapshot.child("users/" + usid);
        var userName = usersnapshot.val().firstName + " " + usersnapshot.val().lastName;
        if (filteredPic)
        {
          var photoIDObj = {
            uri: filteredPic,
            isStatic: true,
          };
        }
        else {
          var photoIDObj = this.state.avatarSource;
        }
        var post = ref.push({
          comments: 0,
          date: TimeStamp.now(),
          description: self.state.description,
          photoID: photoIDObj,
          rating: 0,
          user: userName,
          userID: usid,
        });


        self.state.tags.forEach((t) => {
          database.child("posts/" + post.key() + "/tags").push({tag: t});
          database.child("tags/" + t.substring(1) + "/postList").push({postId: post.key()});
        });

        postList.push({
          postId: post.key(),
        });
      });
    });
    this.props.navigator.pop();
    this.setState({avatarSource: null});
  }

  cancel() {
    this.props.navigator.pop();
    this.setState({avatarSource: null});
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
        filteredPic = source.uri;
      }
    });
  }

  takePicture() {
    ImagePickerManager.launchCamera(options, (response) => {
      console.log('Response = ', response);
      if(response.didCancel) {
        console.log('User cancelled image picker');
      } else if(response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else {
        // You can display the image using either data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.setState({
          avatarSource: source
        });
        filteredPic = source.uri;
      }
    });
  }

  choosePicture() {
    ImagePickerManager.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if(response.didCancel) {
        console.log('User cancelled image picker');
      } else if(response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else {
        // You can display the image using either data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.setState({
          avatarSource: source
        });
        filteredPic = source.uri;
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
    let delimiter = /\s+/;
    let tags = [];
    let rendered = [];
    let tagText = this.state.description;
    let tokens = tagText.split(delimiter);
    tokens.forEach(function(entry, i) {
      if(i !== tokens.length - 1) {
        if(entry.startsWith("#")) {
          if(tags.indexOf(entry) === -1) {
            tags.push(entry);
            rendered.push(<Text style = {styles.hashtag}>{entry} </Text>);
          }
        } else {
          rendered.push(entry + " ");
        }
      } else {
        rendered.push(entry);
      }
    });
    this.state.tags = tags;

    var limit = 1000;

    return (
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Create A Post"
        />

        <View style = {{margin: 5, alignItems: 'center'}}>
          <Surface width = {this.state.length - 150} height = {this.state.length - 150} ref = "surfacePic">
            {filter}
          </Surface>
        </View>

        <View style = {styles.filterButton}>
          <TouchableOpacity onPress = {() => this.setFilterAndCapture(null)} >
            <Surface width = {filterSize} height = {filterSize}>
              {this.ogImage()}
            </Surface>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.setFilterAndCapture('sat')}>
            <Surface width = {filterSize} height = {filterSize}>
              {this.monoImage()}
            </Surface>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.setFilterAndCapture('filter1')}>
            <Surface width = {filterSize} height = {filterSize}>
              {this.filter1Image()}
            </Surface>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.setFilterAndCapture('ig')}>
            <Surface width = {filterSize} height = {filterSize}>
              {this.igImage()}
            </Surface>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.setFilterAndCapture('test')}>
            <Surface width = {filterSize} height = {filterSize}>
              {this.testImage()}
            </Surface>
          </TouchableOpacity>
        </View>

        <View>
          <TextInput
            maxLength = {limit}
            multiline = {true}
            onChangeText = {(text) => this.setState({description: text})}
            placeholder = {"Description"}
            placeholderTextColor = 'gray'
            style = {styles.multiline}
            underlineColorAndroid = 'black'
            value = {""}>
            <Text>
              {rendered}
            </Text>
          </TextInput>
          <TextInput
            maxLength = {limit}
            multiline = {true}
            onChangeText = {(text) => this.setState({location: text})}
            placeholder = {"Location"}
            placeholderTextColor = 'gray'
            style = {styles.multiline}
            underlineColorAndroid = 'black'
            value = {this.state.location}
          />
          <TextInput
            maxLength = {limit}
            multiline = {true}
            onChangeText = {(text) => this.setState({recipe: text})}
            placeholder = {"Recipe"}
            placeholderTextColor = 'gray'
            style = {styles.multiline}
            underlineColorAndroid = 'black'
            value = {this.state.recipe}
          />
          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.blackButtonText}
            onPress = {this.post.bind(this)}
            text = "Post"
            underlayColor = {'gray'}
          />
          <Button
            buttonStyles = {ButtonStyles.transparentButton}
            buttonTextStyles = {ButtonStyles.blackButtonText}
            onPress = {this.cancel.bind(this)}
            text = "Cancel"
            underlayColor = {'gray'}
          />
        </View>
      </View>
    );
  }

  setFilterAndCapture(filt) {
    this.setState({filter: filt});
    setTimeout(() => {this.onCapture1();}, 300);
  }

  ogImage() {
    return (
      <Image
        source = {this.state.avatarSource}
        style = {{flex: 1}}
      />
    );
  }

  monoImage() {
    return (
      <Saturation
        factor = {0}
        image = {this.ogImage()}
        style = {{flex: 1}}
      />
    );
  }

  filter1Image() {
    return (
      <Instagram
        brightness = {1}
        saturation = {1}
        contrast = {.6}
        hue = {.5}
        sepia = {.5}
        gray = {.1}
        mixFactor = {0}
        tex = {this.ogImage()}
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
        tex = {this.ogImage()}
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
          tex = {this.ogImage()}
        />
    );
  }

  renderBars() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Create A Post"
        />
        <ActionButton buttonColor = '#F26D6A'>
          <ActionButton.Item
            buttonColor = '#DEB050'
            onPress = {this.takePicture.bind(this)}
            title = 'Take a photo'>
            <Icon
              name = 'camera'
              style = {styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor = '#DEB050'
            onPress = {this.choosePicture.bind(this)}
            title = 'Choose from your library'>
            <Icon
              name = 'file-image-o'
              style = {styles.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
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
  actionButtonIcon: {
    color: 'white',
    fontSize: 20,
    height: 22,
  },
  hashtag: {
    color: '#F26D6A',
  },
  filterButton: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 4,
  },
  multiline: {
    color: 'black',
    height: 36,
    marginHorizontal: 8,
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
