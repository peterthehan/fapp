'use strict';
const React = require('react-native');
const styles = require('../styles/header-styles.js')
const { StyleSheet, Text, View } = React;
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
