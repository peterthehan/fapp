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
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import FullImage from '../scenes/full-image';
import PostDetails from "../scenes/post-details";
import Profile from "../scenes/profile";

let database = new Firebase("poopapp1.firebaseio.com");

const windowSize = Dimensions.get('window');

class SmallPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
      liked: false,
      modalVisible: false,
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
      var comments = snapshot.child("posts/" + postSnapshot.key() + "/comments");

      self.setState({
        favorited: didFav,
        rating: rating.val(),
        comments: comments.val(),
      });
    });
  }

  picture() {
    this.setModalVisible(true);
  }

  getFavoriteColor() {
    if(this.state.favorited) {
      return 'orange';
    } else {
      return 'white';
    }
  }

  getFavoriteColorModal() {
    if(this.state.favorited) {
      return 'orange';
    } else {
      return 'black';
    }
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

  details() {
    this.setState({modalVisible: false});
    this.props.navigator.push({component: PostDetails, state: this.state.post});
  }

  fullImage(){
    this.setState({modalVisible: false});
    this.props.navigator.push({component: FullImage, state: this.state.photo});
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View>
        <View style = {styles.item}>
          <TouchableOpacity
            onPress = {() => this.picture()}
            style = {styles.photoTouch}>
            <Image
              resizeMode = "cover"
              source = {this.state.photo}
              style = {styles.photo}>
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

                <Text style = {styles.button, {color: 'white', fontSize: 12}}>
                  {this.state.rating}
                </Text>

                <TouchableOpacity
                  style = {styles.button}
                  onPress = {this.details.bind(this)}>
                  <MaterialIcon
                    color = 'white'
                    name = 'textsms'
                    size = {16}
                  />
                </TouchableOpacity>

                <Text style = {styles.button, {color: 'white', fontSize: 12}}>
                  {this.state.comments}
                </Text>

              </View>
            </Image>
          </TouchableOpacity>
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
                onPress = {this.details.bind(this)}
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
            <Text style = {styles.description}>
              <Text style = {{fontWeight: 'bold'}}>
                Description:&nbsp;
              </Text>
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
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 3,
    marginTop: 4,
  },
  buttonView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    left: 0,
    padding: 4,
    position: 'absolute',
    right: 0,
  },
  buttonViewModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  description: {
    marginLeft: 2,
    padding: 5,
  },
  item: {
    margin: 2,
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
    margin: 10,
  },
  photo: {
    flex: 1,
  },
  photoTouch: {
    height: windowSize.width / 2 - 6,
    width: windowSize.width / 2 - 6,
  },
});

module.exports = SmallPost;
