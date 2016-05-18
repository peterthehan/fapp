'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class StatusBar extends Component {
  render() {
    return (
      <View>
        <View style={styles.statusbar}/>
        <View style={styles.li}>
          <Text style={styles.text}>{this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  title: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  text: {
    color: '#333',
    fontSize: 16,
  }
});
module.exports = StatusBar;
