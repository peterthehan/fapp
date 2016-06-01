'use strict';

import React, {
  Component,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';

import ZoomableImage from '../components/zoomable-image';

class FullImage extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <ZoomableImage
          style = {styles.image}
          source = {this.props.state}
          imageWidth = {100}
          imageHeight = {100}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

module.exports = FullImage;
