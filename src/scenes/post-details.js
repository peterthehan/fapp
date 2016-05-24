'use strict';

import React, {
  AsyncStorage,
  Component,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToolbarAndroid,
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
      <View style = {{backgroundColor: '#4682b4', flex: 1}}>
        <View>
          <ToolbarAndroid
            title = 'Create a Post'
            titleColor = 'white'
            style = {styles.toolbar}
            actions = {[{title: 'Post', show: 'always'}]}
            onActionSelected = {this.onPress.bind(this)}
          />
        </View>

        <TextInput
          style = {TextStyles.textInput}
          onChangeText = {(text) => this.setState({description: text})}
          value = {this.state.description}
          placeholder = {"Give a description"}
          placeholderTextColor = 'white'
          underlineColorAndroid = 'white'
        />

        <TextInput
          style = {TextStyles.textInput}
          onChangeText = {(text) => this.setState({tags: text})}
          value = {this.state.tags}
          placeholder = {"Add tags"}
          placeholderTextColor = 'white'
          underlineColorAndroid = 'white'
        />

        <TextInput
          style = {TextStyles.textInput}
          onChangeText = {(text) => this.setState({location: text})}
          value = {this.state.location}
          placeholder = {"Enter location"}
          placeholderTextColor = 'white'
          underlineColorAndroid = 'white'
        />

        <TextInput
          style = {TextStyles.textInput}
          onChangeText = {(text) => this.setState({recipe: text})}
          value = {this.state.recipe}
          placeholder = {"Cooked it yourself? Add a recipe!"}
          placeholderTextColor = 'white'
          underlineColorAndroid = 'white'
        />
        <Image
          source = {{uri: this.state.image}}
          style = {{flex: 1}}
        />
      </View>
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
  toolbar: {
    height: 56,
    backgroundColor: '#4682b4',
  },
});

module.exports = Tags;
