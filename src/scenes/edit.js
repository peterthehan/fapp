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

import PostDetails from './post-details';

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
          onActionSelected = {this.postDetails.bind(this)}
          style = {styles.toolbar}
          title = 'Create a Post'
        />
      </View>
    );
  }

  postDetails() {
    this.props.navigator.push({component: PostDetails});
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
