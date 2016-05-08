'use strict';

const React = require('react-native');
const { TextInput } = React;

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
