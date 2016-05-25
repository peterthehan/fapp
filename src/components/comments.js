'use strict';

import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import GridView from './grid-view';

const tempComments = ["Comment 1", "Comment 2", "Comment 3", "Comment 4", "Comment 5", "Comment 6", "Comment 7", "Comment 8"];

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    this.queryData();
  }

  queryData() {
    // TODO: query database for comments
    this.setState({dataSource: tempComments});
  }

  renderRow(comment) {
    return (
      <View style = {styles.postView}>
        <Text>
          {comment}
        </Text>
      </View>
    );
  }

  updateText(text) {
    // database stuff
    this.refs['newCommentInput'].clear();
    alert(text);
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.commentView}>
          <GridView
            dataSource = {this.state.dataSource}
            onRefresh = {this.queryData.bind(this)}
            renderRow = {this.renderRow.bind(this)}
          />
        </View>
        <TextInput
          onSubmitEditing = {(event) => this.updateText(event.nativeEvent.text)}
          placeholder = {"Add a comment"}
          placeholderTextColor = 'gray'
          ref = {'newCommentInput'}
          style = {styles.textInput}
          underlineColorAndroid = 'gray'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  commentView: {
  },
  textInput: {
  },
  postView: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
    width: Dimensions.get("window").width,
  },
});

module.exports = Comments;
