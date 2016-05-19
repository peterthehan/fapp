'use strict';

import React, {
  Component,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class Button extends Component {

  render() {
    return (
      <View>
        <TouchableHighlight
          onPress = {this.props.onPress}
          style = {this.props.buttonStyles}
          underlayColor = {this.props.underlayColor}>
          <View>
            <Text style = {this.props.buttonTextStyles}>
              {this.props.text}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Button;
