'use strict';
var React = require('react-native');
const styles = require('../styles/header-styles.js')
const { View, TouchableHighlight, Text } = React;
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
