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
      selectedOption: 'All',
      searchText: '',
    };
  }

  componentDidMount() {
    this.setState({userId: database.getAuth().uid});
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

    if(this.state.searchText === ''){
      // this section loads the postIDs into myBlob and pushes them to dataSourceAll
      database.child("posts").once("value", function(snapshot) {
        snapshot.forEach(function(postSnapshot) {
          myBlob.push(postSnapshot);
        });
        myBlob.sort((a, b) => {
          return b.val().date - a.val().date;
        });
        self.setState({dataSourceAll: []});
        self.setState({dataSourceAll: myBlob});
      });
    } else {
      database.child("tags/" + this.state.searchText + "/postList").once("value", function(snapshot){
        snapshot.forEach(function(postElementSnapshot){
          database.child("posts/" + postElementSnapshot.val().postId).once("value", function(postSnapshot){
            myBlob.push(postSnapshot);
          });
        });
        myBlob.sort((a, b) => {
          return b.val().date - a.val().date;
        });
        self.setState({dataSourceAll: []});
        self.setState({dataSourceAll: myBlob});
      });
    }
  }

  queryDataFollowing() {
    var myBlob = [];
    var self = this;

    if(this.state.searchText === ''){
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
        self.setState({dataSourceFollowing: []});
        self.setState({dataSourceFollowing: myBlob});
      });
    } else {
      var following = [];
      database.child("users/" + database.getAuth().uid + "/followingList").once("value", function(snapshot){
        snapshot.forEach(function(followingSnapshot){
          following.push(followingSnapshot.val().userId);
        });
      });
      database.child("tags/" + this.state.searchText + "/postList").once("value", function(snapshot){
        snapshot.forEach(function(postElementSnapshot){
          database.child("posts/" + postElementSnapshot.val().postId).once("value", function(postSnapshot){
            if(following.indexOf(postSnapshot.val().userID) >= 0){
              myBlob.push(postSnapshot);
            }
          });
        });
        myBlob.sort((a, b) => {
          return b.val().date - a.val().date;
        });
        self.setState({dataSourceFollowing: []});
        self.setState({dataSourceFollowing: myBlob});
      });
    }
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
    });
  }

  onChangeText(text){
    this.setState({searchText: text});
    if(this.state.selectedOption === 'All'){
      this.queryDataAll();
    } else {
      this.queryDataFollowing();
    }
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
          text = "Fapp"
        />
        <SegmentedControls
          backTint = {'#F26D6A'}
          onSelection = {this.setSelectedOption.bind(this)}
          options = {options}
          selectedOption = {this.state.selectedOption}
          selectedTint = {'#F26D6A'}
          tint = {'white'}
        />
        <SearchBar onChangeText = {this.onChangeText.bind(this)}/>
        {this.renderFeed()}
      </View>
    );
  }
}

module.exports = Home;
