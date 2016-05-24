'use strict';

import React, {
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Firebase from 'firebase';

import EventPost from '../components/event-post';
import GridView from '../components/grid-view';
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

  componentDidMount(){
    this.queryData();
  }

  queryData() {
    var myBlob = [];
    var self = this;

    // this section loads the postIDs into myBlob and pushes them to dataSource
    database.once("value", function(snapshot){
      var eventsSnapshot = snapshot.child("events");
      eventsSnapshot.forEach(function(eventSnapshot) {
        myBlob.push(eventSnapshot);
      });
      self.setState({dataSource: myBlob});
    });
  }

  renderRow(eventData){
    return(
      <EventPost
        navigator = {this.props.navigator}
        id = {eventData}
      />
    );
  }

  createEvent(){
    this.props.navigator.push({component: CreateEvent});
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Events"
        />
        <GridView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}
          onRefresh = {this.queryData.bind(this)}
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
