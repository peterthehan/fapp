import React, {
  Component,
  TextInput,
} from 'react-native';

class SearchBar extends Component {

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

export default SearchBar;
