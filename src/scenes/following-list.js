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
import SearchBar from '../components/search-bar';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class FollowingList extends Component {
  constructor(props) {
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

    database.child("users/" + this.props.state + "/followingList").once("value", function(snapshot) {
      snapshot.forEach(function(followingIdSnapshot) {
        database.child("users/" + followingIdSnapshot.val().userId).once("value", function(followingSnapshot){
          let following = {
            userId: followingSnapshot.key(),
            name: followingSnapshot.val().firstName + " " + followingSnapshot.val().lastName,
            profilePic: followingSnapshot.val().profilePic,
          };
          myBlob.push(following);
        });
      });
      self.setState({dataSource: myBlob});
    });
  }

  profile(following) {
    const Profile = require('../scenes/profile');
    this.props.navigator.push({component: Profile, state: following.userId});
  }

  renderRow(following) {
    return (
      <View style = {styles.container}>
        <TouchableOpacity
          style = {styles.touchView}
          onPress = {() => this.profile(following)}>
          <Image
            style = {styles.userImage}
            source = {following.profilePic}
          />
          <View style = {styles.nameView}>
            <Text style = {styles.name}>
              {following.name}
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
          text = "Following List"
          hasBack = {'true'}
        />
        <SearchBar/>
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

module.exports = FollowingList;
