'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FriendList from './friend-list';
import FollowingList from './following-list';
import GridView from '../components/grid-view';
import Post from '../components/post';
import TimeStamp from '../util/time-stamp';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

const windowSize = Dimensions.get('window');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      profilePic: '',
      numberFriends: 0,
      followers: 0,
    };
  }

  componentDidMount() {
    this.queryData();
    var loggedUserId;
    var self = this;

    AsyncStorage.getItem('user_data', (error, result) => {
      loggedUserId = JSON.parse(result).uid;
      var numFollows;
      var numFriends;
      database.child("users/").once("value", function(snapshot) {
        var isFollowing;
        var followingList = snapshot.child(loggedUserId + "/followingList");
        numFollows = snapshot.child(self.props.state + "/followers");
        numFriends = snapshot.child(self.props.state + "/friends");
        if(typeof followingList != 'undefined') {
          followingList.forEach(function(following) {
            if(following.val().userId == self.props.state) {
              isFollowing = true;
            }
          });
        }

        var isFriends = false;
        var friendsList = snapshot.child(loggedUserId + "/friendsList");
        if(typeof friendsList != 'undefined') {
          friendsList.forEach(function(friends) {
            if(friends.val().userId == self.props.state) {
              isFriends = true;
            }
          });
        }
        var youRequested = false;
        var theyRequested = false;
        if(!isFriends) {
          var yourRequests = snapshot.child(loggedUserId + "/friendRequests");
          if(typeof yourRequests != 'undefined') {
            yourRequests.forEach(function(request) {
              if(request.val().userId == self.props.state) {
                theyRequested = true;
              }
            });
          }
          if(!theyRequested) {
            var theirRequests = snapshot.child(self.props.state + "/friendRequests");
            if(typeof theirRequests != 'undefined') {
              theirRequests.forEach(function(request) {
                if(request.val().userId == loggedUserId) {
                  youRequested = true;
                }
              });
            }
          }
        }

        self.setState({
          loggedUser: loggedUserId,
          following: isFollowing,
          followers: numFollows.val(),
          numberFriends: numFriends.val(),
          friends: isFriends,
          yourRequest: youRequested,
          theirRequest: theyRequested,
        });
      });
    });

    database.child("users/").on("value", function(snapshot) {
      var isFollowing;
      var followingList = snapshot.child(loggedUserId + "/followingList");

      if(typeof followingList != 'undefined') {
        followingList.forEach(function(following) {
          if(following.val().userId == self.props.state) {
            isFollowing = true;
          }
        });
      }

      var isFriends = false;
      var friendsList = snapshot.child(loggedUserId + "/friendsList");
      if(typeof friendsList != 'undefined') {
        friendsList.forEach(function(friends) {
          if(friends.val().userId == self.props.state) {
            isFriends = true;
          }
        });
      }

      var youRequested = false;
      var theyRequested = false;
      if(!isFriends) {
        var yourRequests = snapshot.child(loggedUserId + "/friendRequests");
        if(typeof yourRequests != 'undefined') {
          yourRequests.forEach(function(request) {
            if(request.val().userId == self.props.state) {
              theyRequested = true;
            }
          });
        }
        if(!theyRequested) {
          var theirRequests = snapshot.child(self.props.state + "/friendRequests");
          if(typeof theirRequests != 'undefined') {
            theirRequests.forEach(function(request) {
              if(request.val().userId == loggedUserId) {
                youRequested = true;
              }
            });
          }
        }
      }

      var numFollows = snapshot.child(self.props.state + "/followers");
      var numFriends = snapshot.child(self.props.state + "/friends");

      self.setState({
        following: isFollowing,
        followers: numFollows.val(),
        numberFriends: numFriends.val(),
        friends: isFriends,
        yourRequest: youRequested,
        theirRequest: theyRequested,
      });
    });
  }

  queryData() {
    var myBlob = [];
    var self = this;

    database.once("value", function(snapshot) {
      // user
      var usersnapshot = snapshot.child("users/" + self.props.state);
      var proPic = usersnapshot.val().profilePic.uri;

      // posts
      var userPostsSnapshot = usersnapshot.child("postList");
      userPostsSnapshot.forEach(function(userPostSnapshot) {
        var postSnapshot = snapshot.child("posts/" + userPostSnapshot.val().postId);
        myBlob.push(postSnapshot);
      });

      self.setState({
        items: myBlob,
        name: usersnapshot.val().firstName + " " + usersnapshot.val().lastName,
        profilePic: proPic,
      });
    });
  }

  renderRow(post) {
    return (
      <Post
        id = {post}
        navigator = {this.props.navigator}
      />
    );
  }

  getFriendsText(){
    if(this.state.friends) {
      return (
        <View>
          <Text style = {{color: '#F26D6A'}}>
            Friends
          </Text>
        </View>);
    } else if(this.state.yourRequest) {
      return(
        <View>
          <Text style = {{color: 'grey'}}>
            Request Sent
          </Text>
        </View>);
    } else if(this.state.theirRequest) {
      return(
        <View>
          <Text style = {{color: 'grey'}}>
            Accept Request
          </Text>
        </View>);
    } else {
      return (
        <View>
          <Text style = {{color: 'grey'}}>
            Add Friend
          </Text>
        </View>);
    }
  }

  getFriendsColor() {
    if(this.state.friends) {
      return ('#F26D6A');
    } else {
      return ('grey');
    }
  }

  addFriend() {
    var yourFriends = database.child("users/" + this.state.loggedUser + "/friendsList");
    var theirFriends = database.child("users/" + this.props.state + "/friendsList");
    var theirRequests = database.child("users/" + this.props.state + "/friendRequests");
    var numYourFriends = database.child("users/" + this.state.loggedUser + "/friends");
    var numTheirFriends = database.child("users/" + this.props.state + "/friends");
    var numYourFollowers = database.child("users/" + this.state.loggedUser + "/followers");
    var yourNotifications = database.child("users/" + this.state.loggedUser + "/notifications");
    var theirNotifications = database.child("users/" + this.props.state + "/notifications");

    var self = this;

    if(!this.state.friends && !this.state.yourRequest && !this.state.theirRequest) //This is the case where neither of you has sent a request. We want to send a friend request.
    {
      theirRequests.push({userId: this.state.loggedUser});

      // send notification
      theirNotifications.push({
        userID: this.state.loggedUser,
        type: "users",
        objectID: this.state.loggedUser,
        action: "friendRequest",
        textDetails: "nothing",
        date: TimeStamp.now(),
      });

      // we want to follow them!
      if(!self.state.following) {
        self.addFollow();
      }
    } else if(this.state.yourRequest)  // This is the case where you want to cancel your friend request
    {
      // delete your friend request in their friendRequests and notifications
      database.child("users/").once("value", function(snapshot) {
        // friendRequests
        var requestData = snapshot.child(self.props.state + "/friendRequests");
        if(typeof requestData != 'undefined') {
          requestData.forEach(function(request) {
            if(request.val().userId == self.state.loggedUser) {
              var toDelete = database.child("users/" + self.props.state + "/friendRequests/" + request.key().toString() + "/userId");
              toDelete.set(null);
            }
          });
        }

        // notifications
        var notificationData = snapshot.child(self.props.state + "/notifications");
        if(typeof notificationData != 'undefined') {
          notificationData.forEach(function(request) {
            if(request.val().action == "friendRequest" &&
              request.val().userID == self.state.loggedUser) {
              var toDelete = theirNotifications.child(request.key().toString());
              toDelete.set(null);
            }
          });
        }
      });
      // unfollow them
      if(self.state.following) {
        self.addFollow();
      }
    } else if (this.state.theirRequest) // This is the case where they sent a friend request. We want to add them as a friend.
    {
      // delete their friend request in your friendRequests
      database.child("users/").once("value", function(snapshot) {
        var requestData = snapshot.child(self.state.loggedUser + "/friendRequests");
        if(typeof requestData != 'undefined') {
          requestData.forEach(function(request) {
            if(request.val().userId == self.props.state) {
              var toDelete = database.child("users/" + self.state.loggedUser + "/friendRequests/" + request.key().toString() + "/userId");
              toDelete.set(null);
            }
          });
        }
        //add them as friends
        yourFriends.push({userId: self.props.state});
        theirFriends.push({userId: self.state.loggedUser});
        numYourFriends.transaction(function(currentFriends) {
          return currentFriends + 1;
        });
        numTheirFriends.transaction(function(currentFriends) {
          return currentFriends + 1;
        });

        //send notifications
        theirNotifications.push({
          userID: self.state.loggedUser,
          type: "users",
          objectID: self.state.loggedUser,
          action: "friendAccept",
          textDetails: "nothing",
          date: TimeStamp.now(),
        })
      });
      //we want to follow them!
      if (!self.state.following) {
        self.addFollow();
      }
    } else // This is the case wehre you guys are friends. You want to delete them and unfollow for both
    {
      var theyWereFollowing = false;
      database.child("users/").once("value", function(snapshot) {
        // delete them on your friendsList
        var yourFriendsData = snapshot.child(self.state.loggedUser + "/friendsList");
        if(typeof yourFriendsData != 'undefined') {
          yourFriendsData.forEach(function(friend) {
            if(friend.val().userId == self.props.state) {
              var toDelete = database.child("users/" + self.state.loggedUser + "/friendsList/" + friend.key().toString() + "/userId");
              toDelete.set(null);
            }
          });
        }
        // delete yourself on their friendsList
        var theirFriendsData = snapshot.child(self.props.state + "/friendsList");
        if(typeof theirFriendsData != 'undefined') {
          theirFriendsData.forEach(function(friend) {
            if(friend.val().userId == self.state.loggedUser) {
              var toDelete = database.child("users/" + self.props.state + "/friendsList/" + friend.key().toString() + "/userId");
              toDelete.set(null);
            }
          });
        }

        // have them unfollow you
        var followData = snapshot.child(self.props.state + "/followingList");
        if(typeof followData != 'undefined') {
          followData.forEach(function(follower) {
            if(follower.val().userId == self.state.loggedUser) {
              theyWereFollowing = true;
              var toDelete = database.child("users/" + self.props.state + "/followingList/" + follower.key().toString() + "/userId");
              toDelete.set(null);
            }
          });
        }

      });

      // unfollow them
      if(this.state.following) {
        self.addFollow();
      }

      // only decrease your follower count if they were following you before
      if(theyWereFollowing) {
        numYourFollowers.transaction(function(currentFollowers) {
          return currentFollowers - 1;
        });
      }
      numYourFriends.transaction(function(currentFriends) {
        return currentFriends - 1;
      });
      numTheirFriends.transaction(function(currentFriends) {
        return currentFriends - 1;
      });
    }
  }

  getFollowingText() {
    if(this.state.following) {
      return (
        <View>
          <Text style = {{color: '#F26D6A'}}>
            Following
          </Text>
        </View>);
    } else {
      return (
        <View>
          <Text style = {{color: 'grey'}}>
            Follow
          </Text>
        </View>);
    }
  }

  getFollowingColor() {
    if(this.state.following) {
      return ('#F26D6A');
    } else {
      return ('grey');
    }
  }

  addFollow() {
    var theirNotifications = database.child("users/" + this.props.state + "/notifications");
    var userFollowing = database.child("users/" + this.state.loggedUser + "/followingList");
    var numFollowers = database.child("users/" + this.props.state + "/followers");

    if(!this.state.following) {
      userFollowing.push({userId: this.props.state});
      numFollowers.transaction(function(currentFollowers) {
        return currentFollowers + 1;
      });
      theirNotifications.push({
        userID: this.state.loggedUser,
        type: "users",
        objectID: this.state.loggedUser,
        action: "following",
        textDetails: "nothing",
        date: TimeStamp.now(),
      });
    } else {
      var self = this;

      database.child("users/").once("value", function(snapshot) {
        var followData = snapshot.child(self.state.loggedUser + "/followingList");
        if(typeof followData != 'undefined') {
          followData.forEach(function(follower) {
            if(follower.val().userId == self.props.state) {
              var toDelete = database.child("users/" + self.state.loggedUser + "/followingList/" + follower.key().toString() + "/userId");
              toDelete.set(null);
            }
          });
        }
      });

      numFollowers.transaction(function(currentFollowers) {
        return currentFollowers - 1;
      });
    }
  }

  followingList() {
    this.props.navigator.push({component: FollowingList, state: this.props.state});
  }

  friendList() {
    this.props.navigator.push({component: FriendList, state: this.props.state});
  }

  showFriends() {
    if(this.state.loggedUser == this.props.state) {
      return (
        <View style = {{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.followingList.bind(this)}>
            <Text style = {{fontSize: 28}}>
              {this.state.followers}
            </Text>
            <Text>
              Followers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.friendList.bind(this)}>
            <Text style = {{fontSize: 28}}>
              {this.state.numberFriends}
            </Text>
            <Text>
              Friends
            </Text>
          </TouchableOpacity>
        </View>);
    } else {
      return (
        <View style = {{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            onPress = {() => this.addFriend()}
            style = {styles.button}>
            <Icon
              color = {this.getFriendsColor()}
              name = 'account-circle'
              size = {36}
            />
            {this.getFriendsText()}
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {() => this.addFollow()}
            style = {styles.button}>
            <Icon
              color = {this.getFollowingColor()}
              name = 'note-add'
              size = {36}
            />
            {this.getFollowingText()}
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.friendList.bind(this)}>
            <Text style = {{fontSize: 28}}>
              {this.state.numberFriends}
            </Text>
            <Text>
              Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.followingList.bind(this)}>
            <Text style = {{fontSize: 28}}>
              {this.state.followers}
            </Text>
            <Text>
              Followers
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          hasBack = {true}
          navigator = {this.props.navigator}
          text = "Profile"
        />
        <ScrollView style = {{flex: 1}}>
          <View style = {{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
          }}>
            <Image
              style = {{
                height: Dimensions.get("window").width / 4,
                width: Dimensions.get("window").width / 4,
              }}
              // resizeMode = {Image.resizeMode.center}
              source = {{uri: this.state.profilePic}}
            />
            <Text style = {{fontSize: 24, color: 'black',}}>
              {this.state.name}
            </Text>
          </View>
          {this.showFriends()}
          <GridView
            dataSource = {this.state.items}
            onRefresh = {this.queryData.bind(this)}
            renderRow = {this.renderRow.bind(this)}
          />
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
    paddingRight: 4,
  },
});

module.exports = Profile;
