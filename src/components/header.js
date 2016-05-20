'use strict';

import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class Header extends Component {

  render() {
    return (
      <View style = {styles.header}>
        {this.backButton()}
        <Text style = {styles.headerText}>
          {this.props.text}
        </Text>
        <Image
          style = {styles.headerImage}
          source = {this.props.image}>
        </Image>
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

var styles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  headerText: {
    color: '#FFF',
    fontSize: 18
  },
  headerImage: {
  },
  backButton: {
    position: 'absolute',
  }
});

module.exports = Header;
