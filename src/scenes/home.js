'use strict';

import React, {
  Component,
  Dimensions,
  RefreshControl,
  View
} from 'react-native';

import Firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';

import GridView from '../components/grid-view';
import Modal from 'react-native-simple-modal';
import Profile from "../scenes/profile";
import SearchBar from '../components/search-bar';
import TitleBar from '../components/title-bar';
import SmallPost from '../components/small-post';

let database = new Firebase("poopapp1.firebaseio.com");

const windowSize = Dimensions.get('window');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      open: false,
    };
  }

  componentDidMount(){
    this.queryData();
  }

  renderRow(post) {
    return (
      <SmallPost
        navigator = {this.props.navigator}
        id = {post}
      />
    );
  }

  queryData(){
    var myBlob = [];
    var self = this;

    // this section loads the postIDs into myBlob and pushes them to dataSource
    database.once("value", function(snapshot){
      var postsSnapshot = snapshot.child("posts");
      postsSnapshot.forEach(function(postSnapshot) {
        myBlob.push(postSnapshot);
      });
      self.setState({dataSource: myBlob});
    });
  }

  render() {
    return(
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Home"
        />
        <SearchBar/>
        <GridView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}
          onRefresh = {this.queryData.bind(this)}
        />
      </View>
    );
  }
}

module.exports = Home;
