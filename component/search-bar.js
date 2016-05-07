import React, {
  Component,
  TextInput,
} from 'react-native';

class SearchBar extends Component {

  constructor() {
    super();
    this.state = {
      onSubmit: [],
      text: "",
    };
  }

  componentDidMount() {
    let onSubmit = this.props.onSubmit;
    this.setState({ onSubmit });
  }

  render() {
    return(
      <TextInput
        keyboardType = { 'default' }
        onChangeText={(text) => this.setState({text})}
        onSubmitEditing = {() => this.state.onSubmit(this.state.text) }
      />
    );
  }
}

export default SearchBar;
