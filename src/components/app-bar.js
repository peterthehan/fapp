'use strict';

import React, {
  Component,
  Image,
  StyleSheet,
  View,
} from 'react-native';

class AppBar extends Component {
  render() {
    return (
      <View style = {styles.appBarStyles}>
        <Image source = {this.props.image}>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appBarStyles: {
    alignItems: 'center',
    padding: 16,
  }
});

module.exports = AppBar;
