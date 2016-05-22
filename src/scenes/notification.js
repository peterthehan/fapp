'use strict';

import React, {
  Alert,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';

import Button from '../components/button';
import TitleBar from '../components/title-bar';

import ButtonStyles from '../styles/button-styles';
import SceneStyles from '../styles/scene-styles';

let database = new Firebase("poopapp1.firebaseio.com/");

class Notification extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: ds.cloneWithRows([
        'You have 1 new follower: tester',
        'You followed tester'
      ])
    };
  }

  componenetDidMount() {
    AsyncStorage.getItem('user_data', (error, result) =>{
      self.setState({
        userID: JSON.parse(result).uid,
      });
    });
    database.once("value", function(snapshot){
      var usersnapshot = snapshot.child("users/" + this.state.userID);
      var proPic = usersnapshot.val().profilePic;
      var req = database.child("users");
      var data = req.child(this.state.user.uid).postList;
      self.setState({
        name: usersnapshot.val().firstName + " " + usersnapshot.val().lastName,
        profilePic: proPic,
      });
    });
    this.listenForItems();
  }

  listenForItems() {
    var data = database.child('post')
    data.on("child_added", function(snapshot, prevChildKey) {
      var newPost = snapshot.val();
      alert ("create post");
    });
  }

  render() {
    {this.listenForItems()}
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Notification"
        />
        <View style = {{flex:1, backgroundColor: 'white'}}>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {(rowData) =>
            <TouchableOpacity onPress = {this.generate} underlayColor = 'lemonchiffon'>
              <View style = {{flex: 1, height: 50, backgroundColor: 'azure', padding: 10, alignItems: 'center'}}>
                <Text style = {SceneStyles.text}>
                  {rowData}
                </Text>
              </View>
            </TouchableOpacity>
          }
        />
        </View>
      </View>
    );
  }

  following(){
  }

  posts(){
  }

  events(){
  }

}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

module.exports = Notification;
