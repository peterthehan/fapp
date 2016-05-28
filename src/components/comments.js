'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
  }

  queryData() {
    const self = this;
    var myBlob = [];
    AsyncStorage.getItem('user_data', (error, result) => {
      var commentList = database.child(self.props.type + "/" + self.props.id + "/commentList");
      commentList.once("value", function(snapshot){
        snapshot.forEach(function(commentSnapshot){
          var user = database.child("users/" + commentSnapshot.val().userId);
          user.once("value", function(userSnapshot){
            var comment = {
              description: commentSnapshot.val().description,
              userId: commentSnapshot.val().userId,
              userProPic: userSnapshot.val().profilePic,
            }
            myBlob.push(comment);
          });
        });
      });
      self.setState({
        dataSource: myBlob,
        loggedUser: JSON.parse(result).uid,
      });
    });
  }

  renderRow(comment) {
    return (
      <View style = {styles.commentView}>
        <TouchableOpacity
          style = {styles.userImageTouch}
          onPress = {() => {}}>
          <Image
            style = {styles.userImage}
            source = {{uri: comment.userProPic}}
          />
        </TouchableOpacity>
        <View style = {styles.descriptionView}>
          <Text style = {styles.description}>
            {comment.description}
          </Text>
        </View>
      </View>
    );
  }

  updateText(text) {
    // database stuff
    this.refs['newCommentInput'].clear();

    var comment = {
      description: text,
      userId: this.state.loggedUser,
    }
    database.child(this.props.type + "/" + this.props.id + "/commentList").push(comment);

    const self = this;
    var user = database.child("users/" + this.state.loggedUser);
    user.once("value", function(userSnapshot){
      comment.userProPic = userSnapshot.val().profilePic;
      self.state.dataSource.push(comment);
      self.forceUpdate();
    });
  }

  render() {
    return (
      <View style = {styles.container}>
        <GridView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}
          onRefresh = {this.queryData.bind(this)}
        />
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
    flex: 1,
  },
  textInput: {
  },
  commentView: {
    width: Dimensions.get("window").width,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
  },
  userImageTouch: {
  },
  userImage: {
    width: 25,
    height: 25,
    margin: 5,
  },
  descriptionView: {
    width: Dimensions.get("window").width - 45,
  },
  description: {
  },
});

module.exports = Comments;
