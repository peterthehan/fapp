'use strict';

import React, {
  AsyncStorage,
  Component,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Firebase from 'firebase';

import Button from '../components/button';
import TextStyles from '../styles/text-styles';

let database = new Firebase("poopapp1.firebaseio.com");

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      tags: '',
      location: '',
      recipe: '',
      image: this.props.state,
    };
  }

  render() {
    var limit = 100;
    return(
      <View style = {{flex: 1}}>
        <View style = {styles.titleBar, {padding: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: '#F26D6A'}}>
          <View style = {{flex: 1}}>
          </View>
          <View style = {{flex: 2}}>
            <Text style = {styles.titleBarText}>
              Create a Post
            </Text>
          </View>
          <View style = {{flex: 1}}>
            {this.postButton()}
          </View>
        </View>

        <View>
        <TextInput
          style = {{color: 'black'}}
          onChangeText = {(text) => this.setState({description: text})}
          value = {this.state.description}
          placeholder = {"Give a description"}
          placeholderTextColor = 'black'
          underlineColorAndroid = 'black'
        />

        <TextInput
          style = {{color: 'black'}}
          onChangeText = {(text) => this.setState({tags: text})}
          value = {this.state.tags}
          placeholder = {"Add tags"}
          placeholderTextColor = 'black'
          underlineColorAndroid = 'black'
        />

        <TextInput
          style = {{color: 'black'}}
          onChangeText = {(text) => this.setState({location: text})}
          value = {this.state.location}
          placeholder = {"Enter location"}
          placeholderTextColor = 'black'
          underlineColorAndroid = 'black'
        />

        <TextInput
          style = {{color: 'black'}}
          onChangeText = {(text) => this.setState({recipe: text})}
          value = {this.state.recipe}
          placeholder = {"Cooked it yourself? Add a recipe!"}
          placeholderTextColor = 'black'
          underlineColorAndroid = 'blackR'
        />
        <Image
          source =  {this.state.image}
          style = {{flex: 1}}
        />
        </View>
      </View>
    );
  }

  postButton() {
    return (
      <TouchableOpacity
        style = {styles.button, {alignItems: 'flex-end'}}
        onPress = {this.onPress.bind(this)}>
        <Text style = {{color: 'white'}}>Post</Text>
      </TouchableOpacity>
    );
  }

  onPress() {
    var self = this;
    AsyncStorage.getItem('user_data', (error, result) => {
      var usid = JSON.parse(result).uid;
      var ref = database.child("posts");
      var postList = database.child("users/" + usid + "/postList");
      database.once("value", function(snapshot){
        var usersnapshot = snapshot.child("users/" + usid);
        var userName = usersnapshot.val().firstName + " " + usersnapshot.val().lastName;
        var post = ref.push({
          user: userName,
          photoID: self.state.image,
          userID: usid,
          description: self.state.description,
          rating: 0,
        });
        postList.push({
          postId: post.key(),
        });
      });
    });
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  titleBar: {
    padding: 10,
    position: 'absolute',
    backgroundColor: '#F26D6A',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row'
  },
  titleBarText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  button: {
  },
});

module.exports = Tags;
