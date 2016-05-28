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

import PostDetails from "../scenes/post-details";

let database = new Firebase("poopapp1.firebaseio.com");

const windowSize = Dimensions.get('window');

class Post extends Component {
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


  profile() {
    const Profile = require('../scenes/profile');
    this.props.navigator.push({component: Profile, state: this.state.userID});
  }

  picture() {
    // TODO
    this.setModalVisible(true);
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
            <Image
              resizeMode = 'cover'
              source = {this.state.photo}
              style = {styles.modalPhoto}
            />
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
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
  },
  buttonView: {
    alignItems: 'center',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    padding: 4,
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
  descriptionModal: {
    marginLeft: 2,
    padding: 5,
  },
  descriptionView: {
    padding: 12,
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
    margin: 10,
  },
  photoTouch: {
    height: windowSize.width / 2 - 6,
    width: windowSize.width / 2 - 6,
  },
  photo: {
    height: (Dimensions.get("window").width - 16) * 9 / 16,
    width: Dimensions.get("window").width - 16,
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
});

module.exports = Post;
