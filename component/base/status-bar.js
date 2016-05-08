'use strict';

const React = require('react-native');
const { Text, View } = React;

class StatusBar extends React.Component {
  render() {
    return (
      <View style = {this.statusBarStyle(this.props.backgroundColor)}>
        <Text style = {this.titleStyle(this.props.textColor)}>
          {this.props.title}
        </Text>
      </View>
    );
  }

  statusBarStyle(color){
    return {
      backgroundColor: color,
      alignItems: 'center',
      borderBottomColor: '#aaa',
      borderColor: 'transparent',
      borderWidth: 1,
      justifyContent: 'center',
      height: 50,
    }
  }

  titleStyle(color){
    return {
      color: color,
      fontSize: 16,
      fontWeight: "500",
    }
  }
}

module.exports = StatusBar;
