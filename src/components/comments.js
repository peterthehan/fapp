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
      loggedUser: "",
      userName: "",
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
              userProPic: userSnapshot.val().profilePic.uri,
              userName: userSnapshot.val().firstName + " " + userSnapshot.val().lastName,
            }
            myBlob.push(comment);
          });
        });
      });

      var userId = JSON.parse(result).uid;
      database.child("users/" + userId).once("value", function(snapshot){
        self.setState({
          dataSource: myBlob,
          loggedUser: userId,
          userName: snapshot.val().firstName + " " + snapshot.val().lastName,
        });
      });
    });
  }

  profile(userId){
    const Profile = require('../scenes/profile');
    this.props.navigator.push({component: Profile, state: userId});
  }

  renderRow(comment) {
    return (
      <View style = {styles.commentView}>
        <TouchableOpacity
          style = {styles.userImageTouch}
          onPress = {() => this.profile(comment.userId)}>
          <Image
            style = {styles.userImage}
            source = {{uri: comment.userProPic}}
          />
        </TouchableOpacity>
        <View style = {styles.textView}>
          <TouchableOpacity onPress = {() => this.profile(comment.userId)}>
            <Text style = {styles.userName}>
              {comment.userName}
            </Text>
          </TouchableOpacity>
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
    const self = this;

    var comment = {
      description: text,
      userId: this.state.loggedUser,
    };
    database.child(this.props.type + "/" + this.props.id + "/commentList").push(comment);


    database.child(this.props.type + "/" + this.props.id + "/userID").once("value", function(snapshot) {
      var ownerId = snapshot.val();
      if (ownerId != self.state.loggedUser){
        database.child("users/" + ownerId + "/notifications").push({
          userID: self.state.loggedUser,
          type: self.props.type,
          objectID: self.props.id,
          action: "comment",
          textDetails: text,
          date: Date.now(),
        });
      }
    });

    var commentsNum = database.child(this.props.type + "/" + this.props.id + "/comments");
    commentsNum.transaction(function(currentCount){
      return currentCount + 1;
    });

    var user = database.child("users/" + this.state.loggedUser);
    user.once("value", function(userSnapshot){
      comment.userProPic = userSnapshot.val().profilePic.uri;
      comment.userName = self.state.userName;
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
    flexDirection: 'row',
    width: Dimensions.get("window").width,
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
  },
  userImageTouch: {
    paddingTop: 10,
    alignItems: 'center',
  },
  userImage: {
    width: 25,
    height: 25,
    margin: 5,
  },
  textView: {
    paddingVertical: 10,
    paddingLeft: 10,
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
  },
  description: {
  },
});

module.exports = Comments;
