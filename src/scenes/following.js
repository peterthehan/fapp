'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';

import GridView from '../components/grid-view';
import Header from '../components/header';
import Post from '../components/post';
import SearchBar from '../components/search-bar';

import Profile from "../scenes/profile";

let database = new Firebase("poopapp1.firebaseio.com");

class Following extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentDidMount(){
    var myBlob = [];
    var self = this;

    //this section loads the postIDs into myBlob and pushes them to dataSource
    database.once("value", function(snapshot){
      var postsSnapshot = snapshot.child("posts");
      postsSnapshot.forEach(function(postSnapshot) {
        myBlob.push(postSnapshot);
      });
      self.setState({dataSource: myBlob});
    });
  }

  renderRow(post) {
    return (
      <Post navigator = {this.props.navigator} id = {post} />
    );
  }

  queryData(){
    alert("ASFD");
  }

  render() {
    return(
      <View style = {{flex: 1}}>
        <Header
          navigator = {this.props.navigator}
          text = "Following"
          hasBack = {"true"}
        />
        <SearchBar />
        <GridView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}
          onRefresh = {this.queryData.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 8,
  },
  userView: {
    flexDirection: 'row',
    margin: 8,
  },
  userPhoto: {
    width: 30,
    height: 30,
    borderRadius: 90,
    padding: 4,
  },
  userName: {
    padding: 4,
  },
  photo: {
    width: Dimensions.get("window").width - 16,
    height: (Dimensions.get("window").width - 16) * 9 / 16,
  },
  descriptionView: {
    padding: 12,
  },
  description: {
    color: 'black'
  },
  buttonView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
  }
});

module.exports = Following;
