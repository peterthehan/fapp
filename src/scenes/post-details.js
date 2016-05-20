'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  ToolbarAndroid,
  View,
} from 'react-native';

import Button from '../components/button';

import HeaderStyles from '../styles/header-styles';

class Tags extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      tags: '',
      location: '',
      recipe: '',
    };
  }

  onPress() {
    alert('Create the post');
  }

  render() {
    var limit = 100;
    return(
      <View style = {{backgroundColor: '#4682b4', flex: 1}}>
        <View>
          <ToolbarAndroid
            title = 'Create a Post'
            titleColor = 'white'
            style = {styles.toolbar}
            actions = {[{title: 'Post', show: 'always'}]}
            onActionSelected = {this.onPress.bind(this)}
          />
        </View>

        <TextInput
          style = {HeaderStyles.textinput}
          onChangeText = {(text) => this.setState({description: text})}
          value = {this.state.description}
          placeholder = {"Give a description"}
          placeholderTextColor = 'white'
          underlineColorAndroid = 'white'
        />

        <TextInput
          style = {HeaderStyles.textinput}
          onChangeText = {(text) => this.setState({tags: text})}
          value = {this.state.tags}
          placeholder = {"Add tags"}
          placeholderTextColor = 'white'
          underlineColorAndroid = 'white'
        />

        <TextInput
          style = {HeaderStyles.textinput}
          onChangeText = {(text) => this.setState({location: text})}
          value = {this.state.location}
          placeholder = {"Enter location"}
          placeholderTextColor = 'white'
          underlineColorAndroid = 'white'
        />

        <TextInput
          style = {HeaderStyles.textinput}
          onChangeText = {(text) => this.setState({recipe: text})}
          value = {this.state.recipe}
          placeholder = {"Cooked it yourself? Add a recipe!"}
          placeholderTextColor = 'white'
          underlineColorAndroid = 'white'
        />

      </View>
    );
  }
}

var styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: '#4682b4',
  },
});

module.exports = Tags;
