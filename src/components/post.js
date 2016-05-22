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

import GridView from './grid-view';
import Profile from "../scenes/profile";
import SearchBar from './search-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    var postSnapshot = this.props.id;
    var self = this;

    database.once("value", function(snapshot){
      var userid = postSnapshot.val().userID;
      var userSnapshot = snapshot.child("users/" + userid);
      var proPic = userSnapshot.val().profilePic;

      self.setState({
        postID: postSnapshot.key().toString(),
        userID: userid,
        user: postSnapshot.val().user,
        userPhoto: proPic,
        photo: postSnapshot.val().photoID,
        rating: postSnapshot.val().rating,
        description: postSnapshot.val().description,
      });
    });
  }

  profile() {
    this.props.navigator.push({component: Profile, state: this.state.userID});
  }

  picture() {
    // TODO
    // this.props.navigator.push({component: Post, state: post.postID});
  }

  favorite() {
    // post.isFavorite = !post.isFavorite;
    // TODO: update database

    // this is probably bad because it rerenders the entire scene. only really needs to update the Icon's color prop
    this.forceUpdate();
  }

  messages() {
    alert("Go to messages page.");
  }

  getFavoriteColor() {
    return "orange";
  }

  render() {
    return(
      <View style = {styles.item}>
        <View>
          <TouchableOpacity
            style = {styles.userView}
            onPress = {this.profile.bind(this)}>
            <Image
              resizeMode = "cover"
              style = {styles.userPhoto}
              source = {{uri: this.state.userPhoto}}
            />
            <Text style = {styles.userName}>
              {this.state.user}
            </Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.descriptionView}>
          <Text style = {styles.description}>
            {this.state.description}
          </Text>
        </View>
        <TouchableOpacity
          style = {styles.photo}
          onPress = {this.picture.bind(this)}>
          <Image
            resizeMode = "cover"
            style = {{flex: 1}}
            source = {{uri: this.state.photo}}
          />
        </TouchableOpacity>
        <View style = {styles.buttonView}>
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.favorite.bind(this)}>
            <Icon
              name = "star"
              size = {16}
              color = {this.getFavoriteColor()}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.messages.bind(this)}>
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

module.exports = Post;
