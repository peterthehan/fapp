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

import Instagram from '../components/instagram';
import Saturation from '../components/saturation';
import Vignette from '../components/vignette';
import Firebase from 'firebase';
import Button from '../components/button';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextStyles from '../styles/text-styles';
import ButtonStyles from '../styles/button-styles';

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

  onPress() {
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
          date: Date.now(),
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
          filteredPic: source,
        });
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
          avatarSource: source,
          filteredPic: source,
        });
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
    tokens.forEach(function(entry, i){
      if(i !== tokens.length - 1){
        if(entry.startsWith("#")){
          if(tags.indexOf(entry) === -1){
            tags.push(entry);
            rendered.push(<Text style = {styles.hashtag}>{entry} </Text>);
          }
        } else {
          rendered.push(entry + " ");
        }
      }
      else{
        rendered.push(entry);
      }
    });
    this.state.tags = tags;

    var limit = 1000;

    return (
      <View>
        <View style = {styles.titleBar, {padding: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: '#F26D6A'}}>
          <View style = {{flex: 1, alignItems: 'center'}}>
            {this.cameraButton()}
            <Text style = {styles.titleBarText}>
              Create a Post
            </Text>
          </View>
      </View>

      <View>
        <View style = {{marginTop:3, marginLeft: 3, marginRight: 5, marginBottom: 10, alignItems: 'center'}}>
          <Surface width = {this.state.length - 150} height = {this.state.length - 150} ref = "surfacePic">
            {filter}
          </Surface>
        </View>

        <View style = {styles.filterButton}>
            <TouchableOpacity onPress ={()=> this.setFilterAndCapture(null)} >
              <Surface width = {filterSize} height = {filterSize}>
                {this.ogImage()}
              </Surface>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=> this.setFilterAndCapture('sat')}>
              <Surface width = {filterSize} height = {filterSize}>
                {this.monoImage()}
              </Surface>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=> this.setFilterAndCapture('filter1')}>
              <Surface width = {filterSize} height = {filterSize}>
                {this.filter1Image()}
              </Surface>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=> this.setFilterAndCapture('ig')}>
              <Surface width = {filterSize} height = {filterSize}>
                {this.igImage()}
              </Surface>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=> this.setFilterAndCapture('test')}>
              <Surface width = {filterSize} height = {filterSize}>
                {this.testImage()}
              </Surface>
            </TouchableOpacity>
        </View>
        <View>
          <TextInput
            multiline = {true}
            style = {styles.multiline}
            maxLength = {limit}
            onChangeText = {(text) => this.setState({description: text})}
            placeholder = {"Give a description"}
            placeholderTextColor = 'black'
            underlineColorAndroid = 'black'
            value = {""}
          >
            <Text>{rendered}</Text>
          </TextInput>

          <TextInput
            multiline = {true}
            style = {styles.multiline}
            maxLength = {limit}
            onChangeText = {(text) => this.setState({location: text})}
            placeholder = {"Enter location"}
            placeholderTextColor = 'black'
            underlineColorAndroid = 'black'
            value = {this.state.location}
          />

          <TextInput
            multiline = {true}
            style = {styles.multiline}
            maxLength = {limit}
            onChangeText = {(text) => this.setState({recipe: text})}
            placeholder = {"Cooked it yourself? Add a recipe!"}
            placeholderTextColor = 'black'
            underlineColorAndroid = 'black'
            value = {this.state.recipe}
          />
          <Button
            buttonStyles = {ButtonStyles.primaryButton}
            onPress = {this.onPress.bind(this)}
            text = "Post"
            buttonTextStyles = {ButtonStyles.whiteButtonText}
            underlayColor = {'#B18C40'}
          />
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
        <View style = {styles.titleBar}>
          <View style = {{flex: 1, alignItems: 'center'}}>
            <Text style = {styles.titleBarText}>
              Create a Post
            </Text>
          </View>
        </View>

        <View style = {{padding: 20, marginTop: 40}}>
          <TouchableOpacity
            style = {{flex: 1, alignItems: 'center', padding: 10}}
            onPress = {this.takePicture.bind(this)}>
            <Text>
              <Icon name = "camera" color = '#F26D6ACC' size = {120}/>
            </Text>
            <Text
              style = {{fontSize: 20, color: '#000000CC'}}>
              &nbsp;Take Photo...
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style = {{flex: 1, alignItems: 'center', padding: 10}}
            onPress = {this.choosePicture.bind(this)}>
            <Text>
              <Icon name = "file-image-o" color = '#F26D6ACC' size = {120}/>
            </Text>
            <Text
              style = {{fontSize: 20, color: '#000000CC'}}>
              &nbsp;Choose from Library...
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

  render() {
    if(this.state.avatarSource) {
      return this.renderImage();
    } else {
      return this.renderBars();
    }
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row'
  },
  hashtag: {
    color: 'blue'
  },
  multiline: {
    height: 60,
    padding: 4,
    marginTop: 2,
    color: 'black'
  },
  button: {
    height: 20,
    width: 60,
    position: 'absolute',
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
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
