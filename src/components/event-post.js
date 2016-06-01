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

import Firebase from 'firebase';

import EventDetails from '../scenes/event-details';
import SceneStyles from '../styles/scene-styles'

let database = new Firebase("poopapp1.firebaseio.com");

class EventPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      photo: 'default',
      title: '',
    }
    this.showDetails = this.showDetails.bind(this);
  }

  componentDidMount() {
    const eventData = this.props.id;
    this.setState({
      description: eventData.val().description,
      endDate: eventData.val().endDate,
      endTime: eventData.val().endTime,
      id: eventData,
      isPublic: eventData.val().isPublic,
      photo: eventData.val().photo,
      startDate: eventData.val().startDate,
      startTime: eventData.val().startTime,
      title: eventData.val().title,
    });
  }

  showDetails() {
    this.props.navigator.push({
      component: EventDetails,
      state: this.state.id,
    });
  }

  render() {
    return(
      <TouchableOpacity
        onPress = {this.showDetails}
        style = {styles.eventView}>
        <View style = {styles.imageView}>
          <Image
            resizeMode = "cover"
            source = {this.state.photo}
            style = {styles.photo}
          />
        </View>
        <View style = {styles.content}>
          <Text style = {styles.title}>
            {this.state.title}
          </Text>
          <Text style = {styles.dateTime}>
            Starts: {this.state.startDate} @ {this.state.startTime}
          </Text>
          <Text style = {styles.dateTime}>
            Ends: {this.state.endDate} @ {this.state.endTime}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  eventView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderTopWidth: 1,
    flexDirection: 'row',
    width: Dimensions.get("window").width,
  },
  imageView: {
    borderColor: 'gray',
    borderRightWidth: 1,
  },
  photo: {
    height: 100,
    width: 100,
  },
  content: {
    padding: 10,
  },
  title: {
    color: '#F26D6A',
    fontSize: 16,
  },
  dateTime: {
    marginLeft: 10,
  },
});

module.exports = EventPost;
