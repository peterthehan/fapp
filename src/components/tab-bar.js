'use strict';

import React, {
  Animated,
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
var ImagePickerManager = require('NativeModules').ImagePickerManager;


class TabBar extends Component{
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  }

  constructor(props){
    super(props);
    this.state = {
      tabIcons: [],
    }
  }

  componentDidMount() {
    this.setAnimationValue(this.props.activeTab);
  }

  setAnimationValue(value) {
    this.state.tabIcons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress)
        },
      });
    });
  }

  // color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 242 + (204 - 242) * progress;
    const green = 109 + (204 - 109) * progress;
    const blue = 106 + (204 - 106) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
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

  render() {
    const tabWidth = this.props.containerWidth / this.props.tabs.length;
    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0, tabWidth, ],
    });

    return (
      <View>
        <View style = {[styles.tabs, this.props.style]}>
          {this.props.tabs.map((tab, i) => {
            return (
              <TouchableOpacity
                key = {tab}
                onPress = {() => {
                  if (i == 2) {
                    this.openCamera();
                  }
                  this.props.goToPage(i)}
                }
                style = {styles.tab}>
                <Icon
                  name = {tab}
                  size = {30}
                  color = {this.props.activeTab == i ? '#F26D6A' : 'rgb(204,204,204)'}
                  ref = {(icon) => {this.state.tabIcons[i] = icon;}}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <Animated.View style = {[styles.tabUnderlineStyle, { width: tabWidth }, { left, }, ]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#000'
  },
  tabUnderlineStyle: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#F26D6A',
    bottom: 0,
  },
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

module.exports = TabBar;
