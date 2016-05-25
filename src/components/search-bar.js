'use strict';

import React, {
  Component,
  TextInput,
} from 'react-native';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <TextInput
        onChangeText = {(text) => this.setState({text})}
        placeholder = "Search"
        placeholderTextColor = 'gray'
        style = {{height: 40}}
        underlineColorAndroid = 'gray'
      />
    );
  }
}

module.exports = SearchBar;
