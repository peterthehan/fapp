'use strict';

import React, {
  Component,
  TextInput,
  View,
} from 'react-native';

import Button from './button';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  render() {
    return (
      <View>
      <TextInput
        onChangeText = {(text) => {this.setState({content: text});
        this.props.onSearchChange (this.state.content)}}
        placeholder = "Search"
        placeholderTextColor = 'gray'
        style = {{height: 40}}
        underlineColorAndroid = 'gray'
      />
      
      </View>
    );
  }
}

module.exports = SearchBar;
