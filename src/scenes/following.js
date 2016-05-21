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
      var postSnapshot = snapshot.child("posts");
      postSnapshot.forEach(function(postSnapshot) {
        var userid = postSnapshot.val().userID;
        var userSnapshot = snapshot.child("users/" + userid);
        var proPic = userSnapshot.val().profilePic;
        myBlob.push({
          postID: postSnapshot.key().toString(),
          userID: userid,
          user: postSnapshot.val().user,
          userPhoto: proPic,
          photo: postSnapshot.val().photoID,
          rating: postSnapshot.val().rating,
          description: postSnapshot.val().description,
        });
      });
      self.setState({dataSource: myBlob});
    });
  }

  profile(post){
    this.props.navigator.push({component: Profile, state: post.userID});
  }

  picture(post){
    this.props.navigator.push({component: Post, state: post.postID});
  }

  favorite(post){
    //post.isFavorite = !post.isFavorite;
    // TODO: update database

    // this is probably bad because it rerenders the entire scene. only really needs to update the Icon's color prop
    this.forceUpdate();
  }

  messages(post){
    alert("Go to messages page.");
  }

  getFavoriteColor(post){
    return "orange";
  }

  renderRow(post) {
    return (
      <View style = {styles.item}>
        <View>
          <TouchableOpacity
            style = {styles.userView}
            onPress = {() => this.profile(post)}>
            <Image
              resizeMode = "cover"
              style = {styles.userPhoto}
              source = {{uri: post.userPhoto}}
            />
            <Text style = {styles.userName}>
              {post.user}
            </Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.descriptionView}>
          <Text style = {styles.description}>
            {post.description}
          </Text>
        </View>
        <TouchableOpacity
          style = {styles.photo}
          onPress = {() => this.picture(post)}>
          <Image
            resizeMode = "cover"
            style = {{flex: 1}}
            source = {{uri: post.photo}}
          />
        </TouchableOpacity>
        <View style = {styles.buttonView}>
          <TouchableOpacity
            style = {styles.button}
            onPress = {() => this.favorite(post)}>
            <Icon
              name = "star"
              size = {16}
              color = {this.getFavoriteColor(post)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
            onPress = {() => this.messages(post)}>
            <Icon
              name = "feedback"
              size = {16}
              color = "green"
            />
          </TouchableOpacity>
        </View>
      </View>
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
