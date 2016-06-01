'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Firebase from 'firebase';

import CreateEvent from '../scenes/create-event';
import EventPost from '../components/event-post';
import GridView from '../components/grid-view';
import SearchBar from '../components/search-bar';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
    this.renderRow = this.renderRow.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  componentDidMount() {
    this.queryData();
  }

  queryData() {
    var myBlob = [];
    var self = this;

    // this section loads the postIDs into myBlob and pushes them to dataSource
    database.once("value", function(snapshot){
      var eventsSnapshot = snapshot.child("events");
      eventsSnapshot.forEach(function(eventSnapshot) {
        if (eventSnapshot.val().isPublic){
          myBlob.push(eventSnapshot);
        }
      });
      var usersEvents = snapshot.child("users/" + database.getAuth().uid + "/eventsList");
      usersEvents.forEach(function(eventIdSnapshot) {
        var eventToPush = snapshot.child("events/" + eventIdSnapshot.val().eventId);
        myBlob.push(eventToPush);
      });
      self.setState({dataSource: myBlob});
    });
  }

  renderRow(eventData){
    return (
      <EventPost
        id = {eventData}
        navigator = {this.props.navigator}
      />
    );
  }

  createEvent() {
    this.props.navigator.push({component: CreateEvent});
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Events"
        />
        <SearchBar />
        <GridView
          dataSource = {this.state.dataSource}
          onRefresh = {this.queryData.bind(this)}
          renderRow = {this.renderRow.bind(this)}
        />
        <ActionButton
          buttonColor = {'#F26D6A'}
          onPress = {this.createEvent}
        />
      </View>
    );
  }
}

module.exports = Event;
