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
import Modal from 'react-native-simple-modal';


import GridView from './grid-view';
import Header from './header';
import SearchBar from './search-bar';

import Profile from "../scenes/profile";


let database = new Firebase("poopapp1.firebaseio.com");

const windowSize = Dimensions.get('window');

class SmallPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount(){
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

  picture(){
    //TODO
    alert("hi i pressed pic");
    this.setState({open: true, image: this.state.photo});
  }

  favorite(){
    this.state.isFavorite = !this.state.isFavorite;
    // TODO: update database

    // this is probably bad because it rerenders the entire scene. only really needs to update the Icon's color prop
    this.forceUpdate();
  }

  messages(){
    alert("Go to messages page.");
  }

  getFavoriteColor(){
    if(this.state.isFavorite) {
      return "orange";
    } else {
      return "gray";
    }
  }


  render() {
    return (
      <View>
        <View style = {styles.item}>
          <TouchableOpacity
            style = {styles.photo}
            onPress = {() => this.picture()}>
            <Image
              resizeMode = "cover"
              style = {{flex: 1}}
              source = {{uri: this.state.photo}}
            />
          </TouchableOpacity>
          <View style = {styles.buttonView}>
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
        </View>
        <Modal
           offset={this.state.offset}
           open={this.state.open}
           modalDidOpen={() => console.log('modal did open')}
           modalDidClose={() => this.setState({open: false})}
           style={{alignItems: 'center', borderRadius: 20, margin: 0}}>
           <View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => {this.props.navigator.push({component: Profile, state: this.state.userID});}}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      resizeMode = "cover"
                      style = {{borderRadius: 90, width: 20, height: 20, marginRight: 4}}
                      source = {{uri: this.state.userPhoto}}
                    />
                    <Text>{this.state.user}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({open: false})}>
                  <Icon name = "close"
                  size = {25}
                  borderWidth = {7}
                  color = "black"
                  />
                </TouchableOpacity>
              </View>
              <Image
                resizeMode = "cover"
                style = {{width: windowSize.width-10, height: windowSize.width-10}}
                source = {{uri: this.state.image}}
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
              <Text style={{marginTop: 5}}><Text style={{fontWeight: 'bold'}}>Description: </Text>{this.state.description}</Text>
           </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 2,
  },
  photo: {
    width: Dimensions.get("window").width / 3 - 6,
    height: Dimensions.get("window").width / 3 - 6,
  },
  buttonView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonViewModal: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  button: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
  }
});


module.exports = SmallPost;
