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
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextStyles from '../styles/text-styles';

let database = new Firebase("poopapp1.firebaseio.com");

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      image: this.props.state,
      location: '',
      recipe: '',
    };
  }

  render() {
    let delimiter = /\s+/;

    let tags = [];
    let rendered = [];
    let tagText = this.state.description;
    let tokens = tagText.split(delimiter);
    tokens.forEach(function(entry, i){
      if(i !== tokens.length - 1){
        if(entry.startsWith("#")){
          if(tags.indexOf(entry) === -1){
            tags.push(entry);
            rendered.push(<Text style = {styles.hashtag}>{entry} </Text>);
          }
        } else {
          rendered.push(entry + " ");
        }
      }
      else{
        rendered.push(entry);
      }
    });

    var limit = 1000;
    return(
      <View style = {{flex: 1}}>
        <View style = {styles.titleBar, {padding: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: '#F26D6A'}}>
          <View style = {{flex: 1}}>
            <TouchableOpacity onPress = {() => this.props.navigator.pop()}>
              <Icon
              borderWidth = {7}
              color = "white"
              name = "arrow-back"
              size = {25}
              />
            </TouchableOpacity>
          </View>
          <View style = {{flex: 2}}>
            <Text style = {styles.titleBarText}>
              Create a Post
            </Text>
          </View>
          <View style = {{flex: 1}}>
            <Button
              buttonStyles = {styles.button, {alignItems: 'flex-end'}}
              onPress = {this.onPress.bind(this)}
              text = "Post"
              buttonTextStyles = {{color: 'white'}}
            />
          </View>
        </View>

        <View>
          <TextInput
            multiline = {true}
            style = {styles.multiline}
            maxLength = {limit}
            onChangeText = {(text) => this.setState({description: text})}
            placeholder = {"Give a description"}
            placeholderTextColor = 'black'
            underlineColorAndroid = 'black'
            value = {""}
          >
            <Text>{rendered}</Text>
          </TextInput>

          <TextInput
            multiline = {true}
            style = {styles.multiline}
            maxLength = {limit}
            onChangeText = {(text) => this.setState({location: text})}
            placeholder = {"Enter location"}
            placeholderTextColor = 'black'
            underlineColorAndroid = 'black'
            value = {this.state.location}
          />

          <TextInput
            multiline = {true}
            style = {styles.multiline}
            maxLength = {limit}
            onChangeText = {(text) => this.setState({recipe: text})}
            placeholder = {"Cooked it yourself? Add a recipe!"}
            placeholderTextColor = 'black'
            underlineColorAndroid = 'black'
            value = {this.state.recipe}
          />

          <View>
            <Image
              source =  {this.state.image}
              style = {{flex: 1}}
            />
          </View>
        </View>
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
          description: self.state.description,
          photoID: self.state.image,
          rating: 0,
          user: userName,
          userID: usid,
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
  button: {
  },
  titleBar: {
    alignItems: 'center',
    backgroundColor: '#F26D6A',
    flexDirection: 'row',
    left: 0,
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  titleBarText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  hashtag: {
    color: 'blue'
  },
  multiline: {
    height: 60,
    padding: 4,
    marginTop: 10,
    color: 'black'
  },
});

module.exports = CreatePost;
