'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View
} from 'react-native';
import HeaderStyles from '../styles/header-styles';
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
