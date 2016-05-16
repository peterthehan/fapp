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
class StatusBar extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.statusbar}/>
        <View style={styles.li}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}
