'use strict';

import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Header extends Component {

  render() {
    return (
      <View style = {styles.header}>
        <Text style = {styles.headerText}>
          {this.props.text}
        </Text>

        <Image style = {styles.headerImage}
          source = {this.props.image}>
        </Image>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  header: {
    padding: 30,
    alignItems: 'center'
  },
  headerText: {
    color: '#FFF',
    fontSize: 18
  },
  headerImage: {
  }
});

module.exports = Header;
