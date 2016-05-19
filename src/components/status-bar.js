'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class StatusBar extends Component {
  
  render() {
    return (
      <View>
        <View style = {styles.statusbar}/>
        <View style = {styles.li}>
          <Text style = {styles.text}>
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  li: {
    backgroundColor: 'rgba(252,252,182,0.7)',
    borderBottomColor: '#eee',
    borderColor: '#003',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 11,
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
