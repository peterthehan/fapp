'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View
} from 'react-native';
const styles = require('../styles/header-styles.js');

export default class ListItem extends Component {
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
