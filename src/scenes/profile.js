'use strict';

import React, {
  Component,
  Dimensions,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Firebase from 'firebase';
import GridView from '../components/grid-view';
import Post from '../components/post';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

const windowSize = Dimensions.get('window');

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      name: "",
      profilePic: "",
    };
  }

  componentDidMount() {
    this.queryData();
  }

  queryData(){
    var myBlob = [];
    var self = this;

    database.once("value", function(snapshot){
      // user
      var usersnapshot = snapshot.child("users/" + self.props.state);
      var proPic = usersnapshot.val().profilePic;

      // posts
      var userPostsSnapshot = usersnapshot.child("postList");
      userPostsSnapshot.forEach(function(userPostSnapshot){
        var postSnapshot = snapshot.child("posts/" + userPostSnapshot.val().postId);
        myBlob.push(postSnapshot);
      });

      self.setState({
        items: myBlob,
        name: usersnapshot.val().firstName + " " + usersnapshot.val().lastName,
        profilePic: proPic,
      });
    });
  }

  renderRow(post) {
    return (
      <Post
        navigator = {this.props.navigator}
        id = {post}
      />
    );
  }


  render() {
    return(
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Profile"
          hasBack = {true}
        />
        <View style = {{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30,
        }}>
          <Image
            style = {{
              width: Dimensions.get("window").width / 4,
              height: Dimensions.get("window").width / 4,
            }}
            //resizeMode = {Image.resizeMode.center}
            source = {{uri: this.state.profilePic}}
          />
          <Text style = {{fontSize: 25, color: '#000000',}}>
            {this.state.name}
          </Text>
        </View>
        <GridView
          dataSource = {this.state.items}
          renderRow = {this.renderRow.bind(this)}
          onRefresh = {this.queryData.bind(this)}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    margin: 10,
    width: 100,
    height: 100
  }
});

module.exports = Profile;
