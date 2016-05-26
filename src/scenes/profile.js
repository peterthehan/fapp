'use strict';

import React, {
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
      return ("Follow");
  }

  getFollowingIcon(){
      return ('note-add');
  }

  addFollow(){

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
              color = 'grey'
              name = {this.getFollowingIcon()}
              size = {36}
            />
            <Text>
              {this.getFollowingText()}
            </Text>
          </TouchableOpacity>
        </View>
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
