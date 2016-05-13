'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View
} from 'react-native';

class ListItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.text}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
module.exports = ListItem;
