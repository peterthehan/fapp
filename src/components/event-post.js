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
      photo: eventData.val().photo,
      title: eventData.val().title,
    });
  }

  showDetails(){
    this.props.navigator.push({component: EventDetails, state: this.state.id});
  }

  render() {
    return(
      <View style = {styles.eventView}>
        <TouchableOpacity
          onPress = {this.showDetails}>
          <View style = {{width: 100, height: 100}}>
            <Image
              resizeMode = "cover"
              style = {{flex: 1}}
              source = {{uri: this.state.photo}}
            />
          </View>
          <Text style = {SceneStyles.text}>
            {this.state.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventView: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 8,
  },
});

module.exports = EventPost;
