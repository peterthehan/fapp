'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';

import EventDetails from './event-details';
import GridView from '../components/grid-view';
import Button from '../components/button';
import TextStyles from '../styles/text-styles';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com/");

class Notification extends Component {
  constructor(props) {
    super(props);
    /*new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })*/
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    var self = this;
    var loggedUserId;
    var myBlob = [];
    AsyncStorage.getItem('user_data', (error, result) => {
      loggedUserId = JSON.parse(result).uid;

      var notifications = database.child("users/" + loggedUserId + "/notifications");
      notifications.once("value", function(snapshot){
        snapshot.forEach(function(snapshot){
          let item = {
            who: snapshot.val().userID,
            type: snapshot.val().type,
            object: snapshot.val().objectID,
            action: snapshot.val().action,
            details: snapshot.val().textDetails,
          };
          myBlob.push(item);
        });

        self.setState({
          userId: loggedUserId,
          dataSource: myBlob
        });
      });
    });

    database.child("users/" + loggedUserId + "/notifications").on("value", function(snapshot){
      snapshot.forEach(function(snapshot){
        let item = {
          who: snapshot.val().userID,
          type: snapshot.val().type,
          object: snapshot.val().objectID,
          action: snapshot.val().action,
          details: snapshot.val().textDetails,
        };
        myBlob.push(item);
      });

      self.setState({
        userId: loggedUserId,
        dataSource: myBlob,
      });
    });

  }

  renderRow(rowData){
      if (rowData.type == "events") //If the notification is for an event
      {
        if (rowData.action == "comment") //This is when someone comments on your post
        {
          var nameText;
          var profilePicture;
          var commentText;
          database.child("users/" + rowData.who).once("value", function(snapshot){
            nameText = snapshot.val().firstName + " " + snapshot.val().lastName;
            profilePicture = snapshot.val().profilePic;
          });
          commentText = rowData.details;
          return (
            <View style = {{flex: 1}}>
              <TouchableOpacity
                onPress = {() => this.goTo(rowData)}
                underlayColor = 'lemonchiffon'>
                <View style = {{flex: 1, flexDirection: 'row', height: 50, backgroundColor: 'azure', alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style = {{
                      width: 25,
                      height: 25,
                      margin: 5,
                    }}
                    source = {{uri: profilePicture}}
                  />
                  <Text style = {TextStyles.text}>
                    {nameText} commented on your event. "{commentText}"
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }
      }
      return (
        <View><Text>{rowData.object}</Text></View>
      );
  }

  queryData(){

  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Notification"
        />
        <GridView
          dataSource = {this.state.dataSource}
          onRefresh = {this.queryData.bind(this)}
          renderRow = {this.renderRow.bind(this)}
        />
      </View>
    );
  }

  goTo(rowData){
    const navigator = this.props.navigator;
    switch(rowData.type){
      case "events":
        database.child("events/" + rowData.object).once("value", function(snapshot){
          navigator.push({component: EventDetails, state: snapshot});
        });
        break;
      case "posts":
        database.child("posts/" + rowData.id).once("value", function(snapshot){
          /*
          we need to implement a postdetails page that has everything about the post like recipe
          navigator.push({component: PostDetails, state: snapshot});
          */
        });
        break;
    }
  }
}

module.exports = Notification;
