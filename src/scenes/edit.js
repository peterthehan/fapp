'use strict';

import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  ToolbarAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Firebase from 'firebase';

import CreatePost from './create-post';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <ToolbarAndroid
          actions = {[
            {title: 'Details', show: 'always'},
          ]}
          onActionSelected = {this.createPost.bind(this)}
          style = {styles.toolbar}
          title = 'Create a Post'
        />
      </View>
    );
  }

  createPost() {
    this.props.navigator.push({component: CreatePost});
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#4682b4',
    height: 56,
  },
  uploadAvatar: {
    height: 370,
    width: 370,
  }
});

module.exports = Edit;
