'use strict';

import React, {
  Component,
  ScrollView,
  TextInput,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class Comments extends Component {
  render() {
    var flexVar = this.props.flex;
    var newComment = '';
    return (
      <View style = {{flex: flexVar}}>
        <ScrollView
          removeClippedSubviews = {true}
          showsVerticalScrollIndicator = {true}
          automaticallyAdjustContentInsets = {false}
          horizontal = {false}>
          {this.props.commentsArray}
        </ScrollView>

        <TextInput
          ref = {'newCommentInput'}
          onSubmitEditing = {(event) => this.updateText(event.nativeEvent.text)}
          placeholder = {"Add a comment"}
          placeholderTextColor = 'gray'
          underlineColorAndroid = 'gray'
        />
      </View>
    );
  }

  updateText(text) {
    //database stuff
    this.refs['newCommentInput'].clear();
    alert(text);
  }
}

module.exports = Comments;
