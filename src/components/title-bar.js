'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class TitleBar extends Component {
  render() {
    return (
      <View style = {styles.titleBar}>
        {this.backButton()}
        <Text style = {styles.titleBarText}>
          {this.props.text}
        </Text>
      </View>
    );
  }

  backButton() {
    if(this.props.hasBack) {
      return (
        <TouchableOpacity
          onPress = {() => this.props.navigator.pop()}
          style = {styles.backButton}>
          <Icon
            borderWidth = {7}
            color = "white"
            name = "arrow-back"
            size = {25}
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
  },
  titleBar: {
    alignItems: 'center',
    backgroundColor: '#F26D6A',
    padding: 10,
  },
  titleBarText: {
    color: 'white',
    fontSize: 18,
  },
});

module.exports = TitleBar;
