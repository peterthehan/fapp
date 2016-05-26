'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Firebase from 'firebase';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

let database = new Firebase("poopapp1.firebaseio.com");

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    var postSnapshot = this.props.id;
    var self = this;
    var loggedUserId;

    // get the id of the logged in user
    AsyncStorage.getItem('user_data', (error, result) => {
      loggedUserId = JSON.parse(result).uid;
      database.once("value", function(snapshot) {
        var userid = postSnapshot.val().userID;
        var userSnapshot = snapshot.child("users/" + userid);
        var proPic = userSnapshot.val().profilePic;

        var didFav = false;
        var favData = snapshot.child("users/" + loggedUserId + "/favoritedList");

        if(typeof favData != 'undefined') {
          favData.forEach(function(userFaved) {
            if(userFaved.val().postId == postSnapshot.key().toString()) {
              didFav = true;
            }
          });
        }

        self.setState({
          description: postSnapshot.val().description,
          favorited: didFav,
          loggedUser: loggedUserId,
          photo: postSnapshot.val().photoID,
          postID: postSnapshot.key().toString(),
          rating: postSnapshot.val().rating,
          user: postSnapshot.val().user,
          userID: userid,
          userPhoto: proPic,
        });
      });
    });

    // get all of the data we need for a post
    database.on("value", function(snapshot) {
      var userid = postSnapshot.val().userID;
      var userSnapshot = snapshot.child("users/" + userid);
      var proPic = userSnapshot.val().profilePic;

      var didFav = false;
      var favData = snapshot.child("users/" + loggedUserId + "/favoritedList");

      if(typeof favData != 'undefined') {
        favData.forEach(function(userFaved) {
          if(userFaved.val().postId == postSnapshot.key().toString()) {
            didFav = true;
          }
        });
      }

      var rating = snapshot.child("posts/" + postSnapshot.key() + "/rating");

      self.setState({
        favorited: didFav,
        rating: rating.val(),
      });
    });
  }


  profile() {
    const Profile = require('../scenes/profile');
    this.props.navigator.push({component: Profile, state: this.state.userID});
  }

  picture() {
    // TODO
    // this.props.navigator.push({component: Post, state: post.postID});
  }

  favorite() {
    var userFaved = database.child("users/" + this.state.loggedUser + "/favoritedList");
    var postRated = database.child("posts/" + this.state.postID + "/ratedList");
    var ratedVal = database.child("posts/" + this.state.postID + "/rating");

    if(!this.state.favorited) {
      userFaved.push({postId: this.state.postID});
      postRated.push({userId: this.state.loggedUser});
      ratedVal.transaction(function(currentRating) {
        return currentRating + 1;
      });
    } else {
      var postSnapshot = this.props.id;
      var self = this;

      database.once("value", function(snapshot) {
        var favData = snapshot.child("users/" + self.state.loggedUser + "/favoritedList");

        if(typeof favData != 'undefined') {
          favData.forEach(function(userFaved) {
            if(userFaved.val().postId == postSnapshot.key().toString()) {
              var toDelete = database.child("users/" + self.state.loggedUser + "/favoritedList/" + userFaved.key().toString() + "/postId");
              toDelete.set(null);
            }
          });
        }

        var favPostData = snapshot.child("posts/" + self.state.postID + "/ratedList");

        if(typeof favPostData != 'undefined') {
          favPostData.forEach(function(userRated) {
            if(userRated.val().userId == self.state.loggedUser) {
              var toDelete = database.child("posts/" + self.state.postID + "/ratedList/" + userRated.key().toString() + "/userId");
              toDelete.set(null);
            }
          });
        }
      });

      ratedVal.transaction(function(currentRating) {
        return currentRating - 1;
      });
    }
  }

  getFavoriteColor() {
    if(this.state.favorited) {
      return 'orange';
    } else {
      return 'grey';
    }
  }

  messages() {
    alert ("should go to message");
    this.props.navigator.push({component: Message});
  }

  render() {
    return(
      <View style = {styles.item}>
        <View>
          <TouchableOpacity
            onPress = {this.profile.bind(this)}
            style = {styles.userView}>
            <Image
              resizeMode = "cover"
              source = {{uri: this.state.userPhoto}}
              style = {styles.userPhoto}
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
          onPress = {this.picture.bind(this)}
          style = {styles.photo}>
          <Image
            resizeMode = "cover"
            source = {this.state.photo}
            style = {{flex: 1}}
          />
        </TouchableOpacity>

        <View style = {styles.buttonView}>
          <TouchableOpacity
            onPress = {this.favorite.bind(this)}
            style = {styles.button}>
            <MaterialIcon
              color = {this.getFavoriteColor()}
              name = "star"
              size = {16}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.messages.bind(this)}>
            <IonIcon
              color = "deepskyblue"
              name = "ios-chatboxes"
              size = {16}
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
    borderColor: 'gray',
    borderWidth: 1,
    margin: 8,
  },
  userView: {
    flexDirection: 'row',
    margin: 8,
  },
  userPhoto: {
    borderRadius: 90,
    height: 30,
    width: 30,
    padding: 4,
  },
  userName: {
    padding: 4,
  },
  photo: {
    height: (Dimensions.get("window").width - 16) * 9 / 16,
    width: Dimensions.get("window").width - 16,
  },
  descriptionView: {
    padding: 12,
  },
  description: {
    color: 'black'
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
  }
});

module.exports = Post;
