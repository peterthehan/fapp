'use strict';

import React, {
  Component,
  Text,
  TouchableHighlight,
} from 'react-native';

class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress = {this.props.onPress}
        style = {this.props.buttonStyles}
        underlayColor = {this.props.underlayColor}>
        <Text style = {this.props.buttonTextStyles}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

module.exports = Button;
