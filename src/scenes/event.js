'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Firebase from 'firebase';

import CreateEvent from './create-event';
import EventDetails from './event-details';
import GridView from '../components/grid-view';
import SceneStyles from '../styles/scene-styles'
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
    this.renderRow = this.renderRow.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  renderRow(event){
    return(
      <TouchableOpacity onPress = {this.showDetails}>
        <View style = {{flex: 1, height: 50, backgroundColor: 'azure', padding: 10, alignItems: 'center'}}>
          <Text style = {SceneStyles.text}>
            {event.val().title}
          </Text>
        </View>
      </TouchableOpacity>
    );
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

  render() {
    this.queryData();
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

  showDetails(page){
    this.props.navigator.push({component: EventDetails});
  }

  createEvent(){
    this.props.navigator.push({component: CreateEvent});
  }
}

module.exports = Event;
