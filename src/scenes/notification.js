'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';

import EventDetails from './event-details';
import PostDetails from './post-details';
import Profile from './profile';
import GridView from '../components/grid-view';
import Button from '../components/button';
import TextStyles from '../styles/text-styles';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com/");

class Notification extends Component {
  constructor(props) {
    super(props);
    /*new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })*/
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    var self = this;
    var loggedUserId;
    AsyncStorage.getItem('user_data', (error, result) => {
      loggedUserId = JSON.parse(result).uid;

      self.setState({
        userId: loggedUserId,
      });

      var notifications = database.child("users/" + loggedUserId + "/notifications");
      notifications.on("child_added", function(notificationSnapshot){
        let item = {
          who: notificationSnapshot.val().userID,
          type: notificationSnapshot.val().type,
          object: notificationSnapshot.val().objectID,
          action: notificationSnapshot.val().action,
          details: notificationSnapshot.val().textDetails,
        };
        self.state.dataSource.push(item);
        self.forceUpdate();
      });
    });
  }

  renderRow(rowData){
      if (rowData.type == "events") //If the notification is for an event
      {
        if (rowData.action == "comment") //This is when someone comments on your event
        {
          var nameText;
          var profilePicture;
          var commentText;
          database.child("users/" + rowData.who).once("value", function(snapshot){
            nameText = snapshot.val().firstName + " " + snapshot.val().lastName;
            profilePicture = snapshot.val().profilePic.uri;
          });
          commentText = rowData.details;
          return (
            <View style = {styles.container}>
              <TouchableOpacity
                style = {styles.touchView}
                onPress = {() => this.goTo(rowData)}>
                <Image
                  style = {styles.userImage}
                  source = {{uri: profilePicture}}
                />
                <View style = {styles.descriptionView}>
                  <Text style = {styles.description}>
                    {nameText} commented on your event. "{commentText}"
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }
      }
      else if (rowData.type == "posts"){
        if (rowData.action == "comment") //This is when someone comments on your post
        {
          var nameText;
          var profilePicture;
          var commentText;
          database.child("users/" + rowData.who).once("value", function(snapshot){
            nameText = snapshot.val().firstName + " " + snapshot.val().lastName;
            profilePicture = snapshot.val().profilePic.uri;
          });
          commentText = rowData.details;
          return (
            <View style = {styles.container}>
              <TouchableOpacity
                style = {styles.touchView}
                onPress = {() => this.goTo(rowData)}>
                <Image
                  style = {styles.userImage}
                  source = {{uri: profilePicture}}
                />
                <View style = {styles.descriptionView}>
                  <Text style = {styles.description}>
                    {nameText} commented on your post. "{commentText}"
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }
        else if (rowData.action == "like") //This is when someone 'likes' your post
        {
          var nameText;
          var profilePicture;
          database.child("users/" + rowData.who).once("value", function(snapshot){
            nameText = snapshot.val().firstName + " " + snapshot.val().lastName;
            profilePicture = snapshot.val().profilePic.uri;
          });
          return (
            <View style = {styles.container}>
              <TouchableOpacity
                style = {styles.touchView}
                onPress = {() => this.goTo(rowData)}>
                <Image
                  style = {styles.userImage}
                  source = {{uri: profilePicture}}
                />
                <View style = {styles.descriptionView}>
                  <Text style = {styles.description}>
                    {nameText} liked your post.
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }
      }
      else if (rowData.type == "users"){
        var nameText;
        var profilePicture;
        database.child("users/" + rowData.who).once("value", function(snapshot){
          nameText = snapshot.val().firstName + " " + snapshot.val().lastName;
          profilePicture = snapshot.val().profilePic.uri;
        });
        var message =
          rowData.action === "friendRequest" ? "sent you a friend request." :
          rowData.action === "following" ? "is following you." :
          rowData.action === "friendAccept" ? "accepted your friend request." :
          "";
        return (
          <View style = {styles.container}>
            <TouchableOpacity
              style = {styles.touchView}
              onPress = {() => this.goTo(rowData)}>
              <Image
                style = {styles.userImage}
                source = {{uri: profilePicture}}
              />
              <View style = {styles.descriptionView}>
                <Text style = {styles.description}>
                  {nameText} {message}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
      return (
        <View><Text>{rowData.object}</Text></View>
      );
  }

  queryData(){

  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Notification"
        />
        <GridView
          dataSource = {this.state.dataSource}
          onRefresh = {this.queryData.bind(this)}
          renderRow = {this.renderRow.bind(this)}
        />
      </View>
    );
  }

  goTo(rowData){
    const navigator = this.props.navigator;
    switch(rowData.type){
      case "events":
        database.child("events/" + rowData.object).once("value", function(snapshot){
          navigator.push({component: EventDetails, state: snapshot});
        });
        break;
      case "posts":
        database.child("posts/" + rowData.object).once("value", function(snapshot){
          navigator.push({component: PostDetails, state: snapshot});
        });
      case "users":
        navigator.push({component: Profile, state: rowData.object});
        break;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  userImage: {
    width: 25,
    height: 25,
    margin: 10,
  },
  touchView: {
    flexDirection: 'row',
  },
  descriptionView: {
    flex: 1,
    padding: 10,
  },
  description: {
  }
});

module.exports = Notification;
