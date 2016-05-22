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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

import GridView from './grid-view';
import Profile from "../scenes/profile";
import SearchBar from './search-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      favorited: false,
    };
  }

  componentDidMount() {
    var postSnapshot = this.props.id;
    var self = this;
    var loggedUserId;

    //get the id of the logged in user
    AsyncStorage.getItem('user_data', (error, result) =>{
      loggedUserId = JSON.parse(result).uid;
    });

    //get all of the data we need for a post
    database.on("value", function(snapshot){
      var userid = postSnapshot.val().userID;
      var userSnapshot = snapshot.child("users/" + userid);
      var proPic = userSnapshot.val().profilePic;
      var likeData = snapshot.child("posts/" + postSnapshot.key().toString() + "/ratedList");

      var didLike = false;
      if (typeof likeData != 'undefined'){
        likeData.forEach(function(userRated) {
          if (userRated.val().userId == userid){
            didLike = true;
          }
        });
      }

      var favData = snapshot.child("users/" + loggedUserId + "/favoritedList");

      var didFav = false;
      if (typeof favData != 'undefined'){
        favData.forEach(function(userFaved) {
          if (userFaved.val().postId == postSnapshot.key().toString()){
            didFav = true;
          }
        });
      }

      self.setState({
        loggedUser: loggedUserId,
        postID: postSnapshot.key().toString(),
        userID: userid,
        user: postSnapshot.val().user,
        userPhoto: proPic,
        photo: postSnapshot.val().photoID,
        rating: postSnapshot.val().rating,
        description: postSnapshot.val().description,
        liked: didLike,
        favorited: didFav,
      });
    });
  }

  profile() {
    this.props.navigator.push({component: Profile, state: this.state.userID});
  }

  //This function will control the like/dislike function of the button
  like(){
    var postRated = database.child("posts/" + this.state.postID + "/ratedList");
    var ratedVal = database.child("posts/" + this.state.postID + "/rating");

    if (!this.state.liked){
      postRated.push({userId: this.state.userID});
      //postRef.update({rating: (this.state.rating + 1)}, function(){});
      ratedVal.transaction(function(currentRating){
        return currentRating+1;
      });
    }
    else{
      var postSnapshot = this.props.id;
      var self = this;

      database.once("value", function(snapshot){
        var likeData = snapshot.child("posts/" + self.state.postID + "/ratedList");

        if (typeof likeData != 'undefined'){
          likeData.forEach(function(userRated) {
            if (userRated.val().userId == self.state.userID){
              var toDelete = database.child("posts/" + self.state.postID + "/ratedList/" + userRated.key().toString() + "/userId");
              toDelete.set(null);
            }
          });
        }
      });
      ratedVal.transaction(function(currentRating){
        return currentRating-1;
      });
    }
  }

  getLikeColor(){
    if (this.state.liked){
      return "green";
    }
    return "grey";
  }

  picture(){
    //TODO
    //this.props.navigator.push({component: Post, state: post.postID});
  }

  favorite() {
    var userFaved = database.child("users/" + this.state.loggedUser + "/favoritedList");

    if (!this.state.favorited){
      userFaved.push({postId: this.state.postID});
    }
    else{
      var postSnapshot = this.props.id;
      var self = this;

      database.once("value", function(snapshot){
        var favData = snapshot.child("users/" + self.state.loggedUser + "/favoritedList");

        if (typeof favData != 'undefined'){
          favData.forEach(function(userFaved) {
            if (userFaved.val().postId == postSnapshot.key().toString()){
              var toDelete = database.child("users/" + self.state.loggedUser + "/favoritedList/" + userFaved.key().toString() + "/postId");
              toDelete.set(null);
            }
          });
        }
      });
    }
  }

  getFavoriteColor() {
    if (this.state.favorited){
      return "orange";
    }
    return "grey";
  }

  messages() {
    alert("Go to messages page.");
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
            onPress = {this.like.bind(this)}>
            <IonIcon
              name = "ios-pizza"
              size = {16}
              color = {this.getLikeColor()}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.favorite.bind(this)}>
            <MaterialIcon
              name = "star"
              size = {16}
              color = {this.getFavoriteColor()}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.messages.bind(this)}>
            <MaterialIcon
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
