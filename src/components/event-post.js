'use strict';

import React, {
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Firebase from 'firebase';

import EventDetails from '../scenes/event-details';
import SceneStyles from '../styles/scene-styles'

let database = new Firebase("poopapp1.firebaseio.com");

class EventPost extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: "",
      photo: "",
      title: "",
    }
    this.showDetails = this.showDetails.bind(this);
  }

  componentDidMount() {
    const eventData = this.props.id;
    this.setState({
      id: eventData,
      title: eventData.val().title,
      description: eventData.val().description,
      startDate: eventData.val().startDate,
      startTime: eventData.val().startTime,
      endDate: eventData.val().endDate,
      endTime: eventData.val().endTime,
      isPublic: eventData.val().isPublic,
      photo: eventData.val().photo,
    });
  }

  showDetails(){
    this.props.navigator.push({component: EventDetails, state: this.state.id});
  }

  render() {
    return(
      <TouchableOpacity
        style = {styles.eventView}
        onPress = {this.showDetails}>
        <View style = {styles.imageView}>
          <Image
            resizeMode = "cover"
            style = {styles.photo}
            source = {{uri: this.state.photo}}
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
    backgroundColor: 'white',
    width: Dimensions.get("window").width,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  imageView: {
    borderRightWidth: 1,
    borderColor: 'gray',
  },
  photo: {
    width: 100,
    height: 100,
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
