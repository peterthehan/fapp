'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Firebase from 'firebase';
import GridView from '../components/grid-view';
import Post from '../components/post';
import TitleBar from '../components/title-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';

let database = new Firebase("poopapp1.firebaseio.com");

const windowSize = Dimensions.get('window');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      profilePic: '',
    };
  }

  componentDidMount() {
    this.queryData();
    var loggedUserId;
    var self = this;

    AsyncStorage.getItem('user_data', (error, result) => {
      loggedUserId = JSON.parse(result).uid;
      var numFollows;
      database.child("users/").once("value", function(snapshot) {
        var isFollowing;
        var followingList = snapshot.child(loggedUserId + "/followingList");
        numFollows = snapshot.child(self.props.state + "/followers");
        if(typeof followingList != 'undefined') {
          followingList.forEach(function(following) {
            if(following.val().userId == self.props.state) {
              isFollowing = true;
            }
          });
        }

        self.setState({
          loggedUser: loggedUserId,
          following: isFollowing,
          followers: numFollows.val(),
        });
      });
    });

    database.on("value", function(snapshot) {
      var isFollowing;
      var followingList = snapshot.child("users/" + loggedUserId + "/followingList");

      if(typeof followingList != 'undefined') {
        followingList.forEach(function(following) {
          if(following.val().userId == self.props.state) {
            isFollowing = true;
          }
        });
      }

      var numFollows = snapshot.child("users/" + self.props.state + "/followers");

      self.setState({
        following: isFollowing,
        followers: numFollows.val(),
      });
    });
  }

  queryData() {
    var myBlob = [];
    var self = this;

    database.once("value", function(snapshot) {
      // user
      var usersnapshot = snapshot.child("users/" + self.props.state);
      var proPic = usersnapshot.val().profilePic;

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
    return ("Add Friend");
  }

  addFriend(){

  }

  getFollowingText(){
    if (this.state.following){
      return (
        <View>
          <Text style={{color: 'blue'}}>
            Following
          </Text>
        </View>);
    }
    else {
      return (
        <View>
          <Text style={{color: 'grey'}}>
            Follow
          </Text>
        </View>);
    }
  }

  getFollowingColor(){
    if (this.state.following){
      return ('blue');
    }
    else{
      return ('grey');
    }
  }

  addFollow(){
    var userFollowing = database.child("users/" + this.state.loggedUser + "/followingList");
    var numFollowers = database.child("users/" + this.props.state + "/followers");

    if(!this.state.following) {
      userFollowing.push({userId: this.props.state});
      numFollowers.transaction(function(currentFollowers) {
        return currentFollowers + 1;
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

  showFriends(){
    if (this.state.loggedUser == this.props.state){
      return (<View></View>);
    }
    else{
      return(
        <View style = {{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            onPress = {() => this.addFriend()}
            style = {styles.button}>
            <Icon
              color = 'grey'
              name = 'account-circle'
              size = {36}
            />
            <Text>
              {this.getFriendsText()}
            </Text>
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
          <View style = {styles.button}>
            <Text style={{fontSize: 28}}>
              {this.state.followers}
            </Text>
            <Text>
              Followers
            </Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return(
      <View style = {{flex: 1}}>
        <TitleBar
          hasBack = {true}
          navigator = {this.props.navigator}
          text = "Profile"
        />
        <View style = {{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 30,
        }}>
          <Image
            style = {{
              height: Dimensions.get("window").width / 4,
              width: Dimensions.get("window").width / 4,
            }}
            // resizeMode = {Image.resizeMode.center}
            source = {{uri: this.state.profilePic}}
          />
          <Text style = {{fontSize: 25, color: 'black',}}>
            {this.state.name}
          </Text>
        </View>
        {this.showFriends()}
        <GridView
          dataSource = {this.state.items}
          onRefresh = {this.queryData.bind(this)}
          renderRow = {this.renderRow.bind(this)}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    height: 100,
    margin: 10,
    width: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  }
});

module.exports = Profile;
