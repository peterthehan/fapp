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
  Modal,
} from 'react-native';

import Firebase from 'firebase';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import FullImage from '../scenes/full-image';
import PostDetails from "../scenes/post-details";
import TimeStamp from '../util/time-stamp';

let database = new Firebase("poopapp1.firebaseio.com");

const windowSize = Dimensions.get('window');

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
      liked: false,
      modalVisible: false,
      userPhoto: 'default',
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
        var proPic = userSnapshot.val().profilePic.uri;

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
          post: postSnapshot,
          description: postSnapshot.val().description,
          favorited: didFav,
          loggedUser: loggedUserId,
          photo: postSnapshot.val().photoID,
          postID: postSnapshot.key().toString(),
          rating: postSnapshot.val().rating,
          comments: postSnapshot.val().comments,
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
      var proPic = userSnapshot.val().profilePic.uri;

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
      var comments = snapshot.child("posts/" + postSnapshot.key() + "/comments");

      self.setState({
        favorited: didFav,
        rating: rating.val(),
        comments: comments.val(),
      });
    });
  }


  profile() {
    const Profile = require('../scenes/profile');
    this.props.navigator.push({component: Profile, state: this.state.userID});
  }

  fullImage() {
    this.setState({modalVisible: false});
    this.props.navigator.push({component: FullImage, state: this.state.photo});
  }

  favorite() {
    var userFaved = database.child("users/" + this.state.loggedUser + "/favoritedList");
    var postRated = database.child("posts/" + this.state.postID + "/ratedList");
    var ratedVal = database.child("posts/" + this.state.postID + "/rating");
    var notification = database.child("users/" + this.state.userID + "/notifications");

    if(!this.state.favorited) {
      userFaved.push({postId: this.state.postID});
      postRated.push({userId: this.state.loggedUser});
      if (this.state.loggedUser != this.state.userID){
        notification.push({
          userID: this.state.loggedUser,
          type: "posts",
          objectID: this.state.postID,
          action: "like",
          textDetails: "nothing",
          date: TimeStamp.now(),
        });
      }
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
      return 'black';
    }
  }

  getFavoriteColorModal() {
    if(this.state.favorited) {
      return 'orange';
    } else {
      return 'black';
    }
  }

  messages() {
    this.setState({modalVisible: false});
    this.props.navigator.push({component: PostDetails, state: this.state.post});
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return(
      <View>
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
            onPress = {() => this.setModalVisible(true)}
            style = {styles.photo}>
            <Image
              resizeMode = "cover"
              source = {this.state.photo}
              style = {{flex: 1}}
            />
          </TouchableOpacity>

          <View style = {styles.buttonView}>
          <TouchableOpacity
            onPress = {() => this.favorite()}
            style = {styles.button}>
            <MaterialIcon
              color = {this.getFavoriteColor()}
              name = 'star'
              size = {16}
            />
          </TouchableOpacity>

          <Text style = {styles.button, {color: 'black', fontSize: 12}}>
            {this.state.rating}
          </Text>

          <TouchableOpacity
            style = {styles.button}
            onPress = {this.messages.bind(this)}>
            <MaterialIcon
              color = 'black'
              name = 'textsms'
              size = {16}
            />
          </TouchableOpacity>

          <Text style = {styles.button, {color: 'black', fontSize: 12}}>
            {this.state.comments}
          </Text>
          </View>
        </View>
        <Modal
          onRequestClose = {() => {this.setModalVisible(false)}}
          visible = {this.state.modalVisible}>
          <View style = {styles.container}>
            <View style = {styles.modalUserBar}>
              <TouchableOpacity onPress = {() => {this.setModalVisible(false); this.props.navigator.push({component: Profile, state: this.state.userID});}}>
                <View style = {styles.modalUser}>
                  <Image
                    resizeMode = 'cover'
                    style = {{borderRadius: 90, width: 20, height: 20, marginRight: 4}}
                    source = {{uri: this.state.userPhoto}}
                  />
                  <Text>
                    {this.state.user}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress = {() => {this.setModalVisible(false);}}>
                <MaterialIcon
                  borderWidth = {7}
                  color = 'black'
                  name = 'close'
                  size = {25}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress = {this.fullImage.bind(this)}>
              <Image
                resizeMode = 'cover'
                source = {this.state.photo}
                style = {styles.modalPhoto}
              />
            </TouchableOpacity>
            <View style = {styles.buttonViewModal}>
              <TouchableOpacity
                onPress = {() => this.favorite()}
                style = {styles.button}>
                <MaterialIcon
                  color = {this.getFavoriteColorModal()}
                  name = 'star'
                  size = {20}
                />
              </TouchableOpacity>

              <Text style = {styles.button, {fontSize: 12}}>
                {this.state.rating}
              </Text>

              <TouchableOpacity
                onPress = {this.messages.bind(this)}
                style = {styles.button}>
                <MaterialIcon
                  color = 'black'
                  name = 'textsms'
                  size = {20}
                />
              </TouchableOpacity>

              <Text style = {styles.button, {fontSize: 12}}>
                {this.state.comments}
              </Text>

            </View>
            <Text style = {styles.descriptionModal}>
              {this.state.description}
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 4,
  },
  buttonViewModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 4,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 16,
  },
  descriptionModal: {
    marginLeft: 4,
    padding: 4,
  },
  descriptionView: {
    marginBottom: 4,
    padding: 4,
    width: windowSize.width - 8,
    flex: 1,
  },
  description: {
    color: 'black'
  },
  item: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 8,
  },
  modalPhoto: {
    height: windowSize.width,
    width: windowSize.width,
  },
  modalUser: {
    flexDirection: 'row',
  },
  modalUserBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },
  photoTouch: {
  },
  photo: {
    height: (Dimensions.get("window").width - 8) * 9 / 16,
    width: Dimensions.get("window").width - 8,
  },
  userView: {
    flexDirection: 'row',
    margin: 8,
  },
  userPhoto: {
    borderRadius: 90,
    height: 30,
    width: 30,
    paddingLeft: 4,
    paddingTop: 4,
  },
  userName: {
    color: 'black',
    marginLeft: 4,
    paddingTop: 4,
  },
});

module.exports = Post;
