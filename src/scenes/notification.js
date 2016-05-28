'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
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

    AsyncStorage.getItem('user_data', (error, result) => {
      var loggedUserId = JSON.parse(result).uid;

      var myBlob = [];

      var notifications = database.child("users/" + loggedUserId + "/notificationList");
      notifications.once("value", function(snapshot){
        snapshot.forEach(function(snapshot){
          let item = {
            user: snapshot.val().user,
            message: snapshot.val().message,
            date: snapshot.val().date,
            type: snapshot.val().type,
            id: snapshot.val().id
          };
          myBlob.push(item);
        });

        self.setState({
          userId: loggedUserId,
          dataSource: myBlob
        });
      });
    });

    this.eventListener();
    this.followingListener();
  }

  renderRow(rowData){
    return (
      <View style = {{flex: 1}}>
        <TouchableOpacity
          onPress = {() => this.goTo(rowData)}
          underlayColor = 'lemonchiffon'>
          <View style = {{flex: 1, height: 50, backgroundColor: 'azure', alignItems: 'center', justifyContent: 'center'}}>
            <Text style = {TextStyles.text}>
              {rowData.message}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
        database.child("events/" + rowData.id).once("value", function(snapshot){
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

  notification(u, m, t, i){
    var item = {
      user: u,
      message: m,
      date: "need date somehow",
      type: t,
      id: i,
    };

    this.state.dataSource.push(item);

    const notificationList = database.child("users/" + this.state.userId + "/notificationList");
    notificationList.push(item);

    this.forceUpdate();
  }

  eventListener(){
    const self = this;

    const events = database.child("events");

    var firstEventRemove = true;
    events.limitToLast(1).on('child_removed', function(snapshot, prevChildKey){
      if(firstEventRemove) {
        firstEventRemove = false;
      } else {
        self.notification("User", "Event Removed: " + snapshot.val().title, "events", snapshot.key());
      }
    });
    var firstEventAdded = true;
    events.limitToLast(1).on('child_added', function(snapshot, prevChildKey){
      if(firstEventAdded) {
        firstEventAdded = false;
      } else {
        self.notification("User", "Event Added: " + snapshot.val().title, "events", snapshot.key());
      }
    });

    /*
    events.once("value", function(eventsSnapshot){
      eventsSnapshot.forEach(function(eventSnapshot){
        var firstEventChanged = true;
        events.child(eventSnapshot.key()).limitToLast(1).on('child_changed', function(snapshot, prevChildKey){
          if(firstEventChanged) {
            firstEventChanged = false;
          } else {
            // assuming comments additions / removals are the only way events are changed
            self.notification("User", "Comment Added: " + snapshot.child("commentList") + "<-this should wrong", "events", snapshot.key());
          }
        });
      });
    });
    */
  }

  followingListener(){
  }
}

module.exports = Notification;
