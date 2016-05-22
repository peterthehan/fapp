'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class TitleBar extends Component {
  render() {
    return (
      <View style = {styles.titleBarStyles}>
        {this.backButton()}
        <Text style = {styles.titleBarText}>
          {this.props.text}
        </Text>
      </View>
    );
  }

  backButton(){
    if(this.props.hasBack) {
      return (
        <TouchableOpacity
          style = {styles.backButton}
          onPress = {() => this.props.navigator.pop()}>
          <Icon
            name = "arrow-back"
            size = {25}
            borderWidth = {7}
            color = "white"
            />
        </TouchableOpacity>
      );
    }
    else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  titleBarStyles: {
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#F26D6A',
  },
  titleBarText: {
    color: 'white',
    fontSize: 18
  },
  backButton: {
    position: 'absolute',
  }
});

module.exports = TitleBar;
