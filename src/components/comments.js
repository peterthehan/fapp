'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Firebase from 'firebase'
import Icon from 'react-native-vector-icons/MaterialIcons';

import GridView from './grid-view';

let database = new Firebase("poopapp1.firebaseio.com");

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loggedUser: ""
    };
  }

  componentDidMount() {
    this.queryData();
    const self = this;
    AsyncStorage.getItem('user_data', (error, result) => {
      self.setState({
        loggedUser: JSON.parse(result).uid
      });
    });
  }

  queryData() {
    // TODO: query database for comments
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
    var comments = this.props.id;
    var self = this;

    // get the id of the logged in user
    this.state.dataSource.push(text);
    database.child(self.props.type + "/" + self.props.id + "/commentList").push({
      userID: self.state.loggedUser,
      description: text
    });
    this.forceUpdate();
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
