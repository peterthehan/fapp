'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  RefreshControl,
  View,
} from 'react-native';

import {SegmentedControls} from 'react-native-radio-buttons';
import Firebase from 'firebase';

import GridView from '../components/grid-view';
import Post from '../components/post';
import Profile from "../scenes/profile";
import SceneStyles from '../styles/scene-styles';
import SearchBar from '../components/search-bar';
import SmallPost from '../components/small-post';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSourceAll: [],
      dataSourceFollowing: [],
      open: false,
      selectedOption: 'All',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user_data', (error, result) => {
      this.setState({
        userId: JSON.parse(result).uid,
      });
    });
    this.queryDataAll();
    this.queryDataFollowing();
  }

  renderRowAll(post) {
    return (
      <SmallPost
        id = {post}
        navigator = {this.props.navigator}
      />
    );
  }

  renderRowFollowing(post) {
    return (
      <Post
        id = {post}
        navigator = {this.props.navigator}
      />
    );
  }

  queryDataAll() {
    var myBlob = [];
    var self = this;

    // this section loads the postIDs into myBlob and pushes them to dataSourceAll
    database.child("posts").once("value", function(snapshot) {
      snapshot.forEach(function(postSnapshot) {
        myBlob.push(postSnapshot);
      });
      myBlob.sort((a, b) => {
        return b.val().date - a.val().date;
      });
      self.setState({dataSourceAll: myBlob});
    });
  }

  queryDataFollowing() {
    var myBlob = [];
    var self = this;

    // this section loads the postIDs into myBlob and pushes them to dataSourceFollowing
    database.once("value", function(snapshot) {
      var followingList = snapshot.child("users/" + self.state.userId + "/followingList");
      followingList.forEach(function(followingSnapshot) {
        var follower = snapshot.child("users/" + followingSnapshot.val().userId);
        if(follower.hasChild("postList")) {
          var postList = follower.child("postList");
          postList.forEach(function(postSnapshot) {
            var postId = postSnapshot.val().postId;
            var postData = snapshot.child("posts/" + postId);
            myBlob.push(postData);
          });
        }
      });
      myBlob.sort((a, b) => {
        return b.val().date - a.val().date;
      });
      self.setState({dataSourceFollowing: myBlob});
    });
  }

  renderFeed() {
    if(this.state.selectedOption === "All") {
      return (
        <GridView
          dataSource = {this.state.dataSourceAll}
          onRefresh = {this.queryDataAll.bind(this)}
          renderRow = {this.renderRowAll.bind(this)}
        />
      );
    } else {
      return (
        <GridView
          dataSource = {this.state.dataSourceFollowing}
          onRefresh = {this.queryDataFollowing.bind(this)}
          renderRow = {this.renderRowFollowing.bind(this)}
        />
      );
    }
  }

  setSelectedOption(selectedOption) {
    this.setState({
      selectedOption
    })
  }

  render() {
    const options = [
      "All",
      "Following"
    ];

    return (
      <View style = {{flex: 1, backgroundColor: '#f3f3f3'}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Home"
        />
        <SegmentedControls
          backTint = {'#F26D6A'}
          onSelection = {this.setSelectedOption.bind(this)}
          options = {options}
          selectedOption = {this.state.selectedOption}
          selectedTint = {'#F26D6A'}
          tint = {'white'}
        />
        <SearchBar/>
        {this.renderFeed()}
      </View>
    );
  }
}

module.exports = Home;
