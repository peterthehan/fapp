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
  Modal
} from 'react-native';

import Firebase from 'firebase';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

import GridView from './grid-view';
import Profile from "../scenes/profile";
import SearchBar from './search-bar';

let database = new Firebase("poopapp1.firebaseio.com");

const windowSize = Dimensions.get('window');

class SmallPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
      database.once("value", function(snapshot){
        var userid = postSnapshot.val().userID;
        var userSnapshot = snapshot.child("users/" + userid);
        var proPic = userSnapshot.val().profilePic;
        var likeData = snapshot.child("posts/" + postSnapshot.key().toString() + "/ratedList");

        var didLike = false;
        if (typeof likeData != 'undefined'){
          likeData.forEach(function(userRated) {
            if (userRated.val().userId == loggedUserId){
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
          description: postSnapshot.val().description,
          rating: postSnapshot.val().rating,
          liked: didLike,
          favorited: didFav,
        });
      });
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
          if (userRated.val().userId == loggedUserId){
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
        rating: postSnapshot.val().rating,
        liked: didLike,
        favorited: didFav,
      });
    });
  }

  picture() {
    this._setModalVisible(true);
  }

  //This function will control the like/dislike function of the button
  like(){
    var postRated = database.child("posts/" + this.state.postID + "/ratedList");
    var ratedVal = database.child("posts/" + this.state.postID + "/rating");

    if (!this.state.liked){
      postRated.push({userId: this.state.loggedUser});
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
            if (userRated.val().userId == self.state.loggedUser){
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
      return "chartreuse";
    }
    return "white";
  }

  getFavoriteColor() {
    if (this.state.favorited){
      return "orange";
    }
    return "white";
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

  messages() {
    alert("Go to messages page.");
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  render() {
    return (
      <View>
        <View style = {styles.item}>
          <TouchableOpacity
            style = {styles.photoTouch}
            onPress = {() => this.picture()}>
            <Image
              style = {styles.photo}
              resizeMode = "cover"
              source = {this.state.photo}>
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
                  onPress = {() => this.favorite()}>
                  <MaterialIcon
                    name = "star"
                    size = {16}
                    color = {this.getFavoriteColor()}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style = {styles.button}
                  onPress = {() => this.messages()}>
                  <IonIcon
                    name = "ios-chatboxes"
                    size = {16}
                    color = "deepskyblue"
                  />
                </TouchableOpacity>
              </View>
            </Image>
          </TouchableOpacity>
        </View>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <View style={styles.container}>
            <View style={styles.modalUserBar}>
              <TouchableOpacity onPress={() => {this._setModalVisible(false); this.props.navigator.push({component: Profile, state: this.state.userID});}}>
                <View style={styles.modalUser}>
                  <Image
                    resizeMode = "cover"
                    style = {{borderRadius: 90, width: 20, height: 20, marginRight: 4}}
                    source = {{uri: this.state.userPhoto}}
                  />
                  <Text>{this.state.user}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this._setModalVisible(false);}}>
                <MaterialIcon name = "close"
                  size = {25}
                  borderWidth = {7}
                  color = "black"
                />
              </TouchableOpacity>
            </View>
            <Image
              resizeMode = "cover"
              style = {styles.modalPhoto}
              source = {this.state.photo}
            />
            <View style = {styles.buttonViewModal}>
              <TouchableOpacity
                style = {styles.button}
                onPress = {() => {alert("Database access");}}>
                <MaterialIcon
                  name = "star"
                  size = {28}
                  color = {(this.state.isFavorite) ? ("orange") : ("gray")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style = {styles.button}
                onPress = {() => {alert("Go to messages page.");}}>
                <IonIcon
                  name = "ios-chatboxes"
                  size = {28}
                  color = "deepskyblue"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.description}><Text style={{fontWeight: 'bold'}}>Description: </Text>{this.state.description}</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 2,
  },
  photoTouch: {
    width: windowSize.width / 3 - 6,
    height: windowSize.width / 3 - 6,
  },
  photo: {
    flex: 1,
  },
  buttonView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  buttonViewModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },
  button: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  modalUserBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  modalUser: {
    flexDirection: 'row',
  },
  modalPhoto: {
    width: windowSize.width,
    height: windowSize.width,
  },
  description: {
    padding: 5,
    marginLeft: 2,
  }
});

module.exports = SmallPost;
