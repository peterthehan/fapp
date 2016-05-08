'use strict';

import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

class Button extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <TouchableHighlight
          onPress = {this.props.onPress}
          style = {this.buttonStyle(this.props.color)}>
          <Text style = {styles.label}>
            {this.props.text}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  // separated from the styles below because dynamic color
  buttonStyle(color){
    return {
      backgroundColor: color,
      borderColor: 'transparent',
      borderWidth: 1,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
    }
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

module.exports = Button;
