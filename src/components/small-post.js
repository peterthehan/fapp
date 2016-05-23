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
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    };
  }

  render() {
    return (
      <View>
        <View style = {styles.item}>
          <TouchableOpacity
            style = {styles.photo}
            onPress = {() => this.picture()}>
            <Image
              style = {{flex: 1}}
              resizeMode = "cover"
              source = {{uri: this.state.photo}}>
              <View style = {styles.buttonContainer}>
              <TouchableOpacity
                style = {styles.button}
                onPress = {() => this.favorite()}>
                <Icon
                  name = "star"
                  size = {16}
                  color = {this.getFavoriteColor()}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style = {styles.button}
                onPress = {() => this.messages()}>
                <Icon
                  name = "feedback"
                  size = {16}
                  color = "green"
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
            <View style={styles.innerContainer}>
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
                  <Icon name = "close"
                  size = {25}
                  borderWidth = {7}
                  color = "black"
                  />
                </TouchableOpacity>
              </View>
              <Image
                resizeMode = "cover"
                style = {styles.modalPhoto}
                source = {{uri: this.state.photo}}
              />
              <View style = {styles.buttonViewModal}>
                <TouchableOpacity
                  style = {styles.button}
                  onPress = {() => {alert("Database access");}}>
                  <Icon
                    name = "star"
                    size = {28}
                    color = {(this.state.isFavorite) ? ("orange") : ("gray")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style = {styles.button}
                  onPress = {() => {alert("Go to messages page.");}}>
                  <Icon
                    name = "feedback"
                    size = {28}
                    color = "green"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.description}><Text style={{fontWeight: 'bold'}}>Description: </Text>{this.state.description}</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
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
        isFavorite: false,
      });
    });
  }

  picture() {
    this._setModalVisible(true);
  }

  favorite() {
    this.state.isFavorite = !this.state.isFavorite;
    // TODO: update database

    // this is probably bad because it rerenders the entire scene. only really needs to update the Icon's color prop
    this.forceUpdate();
  }

  messages() {
    alert("Go to messages page.");
  }

  getFavoriteColor() {
    if(this.state.isFavorite) {
      return "orange";
    } else {
      return "gray";
    }
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 2,
  },
  photo: {
    width: windowSize.width / 3 - 6,
    height: windowSize.width / 3 - 6,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonViewModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    opacity: 80
  },
  button: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  innerContainer: {
    borderRadius: 20,
    margin: 5,
    backgroundColor: "white",
  },
  modalUserBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    marginRight:2,
    marginLeft: 4,
    marginTop: 4,
  },
  modalUser: {
    flexDirection: 'row',
  },
  modalPhoto: {
    width: windowSize.width-20,
    height: windowSize.width-20,
    marginLeft: 5,
    marginRight: 5,
  },
  description: {
    padding: 5,
    marginLeft: 2,
  }
});

module.exports = SmallPost;
