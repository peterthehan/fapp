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
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class FriendList extends Component {

  constructor(props){
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    this.queryData();
  }

  queryData() {
    var myBlob = [];
    var self = this;

    database.child("users/" + this.props.state + "/friendsList").once("value", function(snapshot) {
      snapshot.forEach(function(friendIdSnapshot) {
        database.child("users/" + friendIdSnapshot.val().userId).once("value", function(friendSnapshot){
          let friend = {
            userId: friendSnapshot.key(),
            name: friendSnapshot.val().firstName + " " + friendSnapshot.val().lastName,
            profilePic: friendSnapshot.val().profilePic,
          };
          myBlob.push(friend);
        });
      });
      self.setState({dataSource: myBlob});
    });
  }

  profile(friend){
    const Profile = require('../scenes/profile');
    this.props.navigator.push({component: Profile, state: friend.userId});
  }

  renderRow(friend) {
    return (
      <View style = {styles.container}>
        <TouchableOpacity
          style = {styles.touchView}
          onPress = {() => this.profile(friend)}>
          <Image
            style = {styles.userImage}
            source = {friend.profilePic}
          />
          <View style = {styles.nameView}>
            <Text style = {styles.name}>
              {friend.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return(
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Friend List"
          hasBack = {'true'}
        />
        <GridView
          dataSource = {this.state.dataSource}
          onRefresh = {this.queryData.bind(this)}
          renderRow = {this.renderRow.bind(this)}
        />
      </View>
    );
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
  nameView: {
    flex: 1,
    padding: 10,
  },
  name: {
  }
});

module.exports = FriendList;
