'use strict';

import React, {
  Component,
  TextInput,
} from 'react-native';

class SearchBar extends Component {

  render() {
    return (
      <TextInput
        onChangeText = {(text) => this.props.onChangeText(text)}
        placeholder = "Search"
        placeholderTextColor = 'gray'
        style = {{height: 40}}
        underlineColorAndroid = 'gray'
      />
    );
  }
}

module.exports = SearchBar;
