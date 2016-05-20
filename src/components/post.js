'use strict';

import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Firebase from 'firebase';

let database = new Firebase("poopapp1.firebaseio.com");

class Post extends Component {

  constructor(props) {
    super(props);
    var postid = props.id;
    var self = this;

    database.once("value", function(snapshot){
      var postsnapshot = snapshot.child("posts/" + postid);
      var userid = postsnapshot.val().userID;
      var usersnapshot = snapshot.child("users/" + userid);
      var proPic = usersnapshot.val().profilePic;
      self.setState({
        name: postsnapshot.val().user,
        profilePic: proPic,
        image: postsnapshot.val().photoID,
        rating: postsnapshot.val().rating,
        description: postsnapshot.val().description,
      });
    });

    this.state = {
      //these are default fields for a post.
      name: "undef",
      profilePic: "https://pbs.twimg.com/profile_images/425274582581264384/X3QXBN8C_400x400.jpeg",
      image: "https://pbs.twimg.com/profile_images/425274582581264384/X3QXBN8C_400x400.jpeg",
      rating: "undef",
      description: "undef",
    };
  }

  render() {
    return(
      <View style = {styles.postContainer}>
        <View style = {styles.postHead}>
          <TouchableOpacity style = {styles.horizontalView}>
            <View style = {styles.padding}>
              <Image
                style = {styles.posterPic}
                source = {{uri: this.state.profilePic}} />
            </View>
            <View style = {styles.padding}>
              <Text style = {styles.posterName}>
                {this.state.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style = {styles.postImage}>
          <Image
            style = {styles.image}
            source = {{uri: this.state.image}} />
        </View>

        <View style = {styles.horizontalView}>
          <Text style = {styles.rating}>
            {this.state.rating}
          </Text>
          <TouchableOpacity style = {styles.ratingButton}>
              <Icon
                name = "thumbs-o-up"
                size = {20}
                color = "green"
              />
          </TouchableOpacity>
          <TouchableOpacity style = {styles.ratingButton}>
              <Icon
                name = "thumbs-o-down"
                size = {20}
                color = "red"
              />
          </TouchableOpacity>
        </View>

        <View style = {styles.descriptContainer}>
          <Text style = {styles.descText}>
            {this.state.description}
          </Text>
        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  padding: {
    padding: 5,
    marginBottom: 5,
  },
  postContainer: {
    padding: 15,
    borderWidth: 1,
  },
  postHead: {
    flex: 1,
  },
  horizontalView: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex:1,
  },
  posterName: {
    fontSize: 20,
    padding: 5,
    color: '#000000',
  },
  posterPic: {
    height: 40,
    borderRadius: 90,
    width: 40,
  },
  postImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
  rating: {
    padding: 5,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    fontSize: 20,
  },
  ratingButton:{
    padding: 5,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,

  },
  descriptContainer: {
  },
  descText: {
  }
});

module.exports = Post;
