'use strict';

import React, {
  Component,
  TextInput,
} from 'react-native';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  render() {
    return(
      <TextInput
        keyboardType = { 'default' }
        placeholder = "Search"
        onChangeText={(text) => this.setState({text})}
      />
    );
  }
}

module.exports = SearchBar;
