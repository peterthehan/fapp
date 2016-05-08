'use strict';

import React from 'react';
import { TextInput } from 'react-native';

class SearchBar extends React.Component {

  constructor() {
    super();
    this.state = {
      text: "",
    };
  }

  render() {
    return(
      <TextInput
        keyboardType = { 'default' }
        onChangeText={(text) => this.setState({text})} />
    );
  }
}

module.exports = SearchBar;
