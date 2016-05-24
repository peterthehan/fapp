'use strict'

import React, {
  Component,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Comments from '../components/comments';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class EventDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      isGoing: false,
    }
  }

  componentDidMount(){
    var eventSnapshot = this.props.state;
    this.setState({
      title: eventSnapshot.val().title,
      description: eventSnapshot.val().description,
      startDate: eventSnapshot.val().startDate,
      startTime: eventSnapshot.val().startTime,
      endDate: eventSnapshot.val().endDate,
      endTime: eventSnapshot.val().endTime,
      isPublic: eventSnapshot.val().isPublic,
      photo: eventSnapshot.val().photo,
    });
  }

  render() {
    return (
      <View style = {styles.container}>
        <TitleBar
          navigator = {this.props.navigator}
          text = {"Event Details"}
          hasBack = {true}
        />
        <ScrollView style = {styles.content}>
          <Image
            resizeMode = "cover"
            style = {styles.photo}
            source = {{uri: this.state.photo}}
          >
            <View style = {styles.titleView}>
              <Text style = {styles.title}>
                {this.state.title}
              </Text>
            </View>
          </Image>
          <View style = {styles.sectionView}>
            <Text style = {styles.sectionTitle}>
              Starts
            </Text>
            <Text style = {styles.dateTime}>
              {this.state.startDate} @ {this.state.startTime}
            </Text>
          </View>
          <View style = {styles.sectionView}>
            <Text style = {styles.sectionTitle}>
              Ends
            </Text>
            <Text style = {styles.dateTime}>
              {this.state.endDate} @ {this.state.endTime}
            </Text>
          </View>
          <View style = {styles.sectionView}>
            <Text style = {styles.sectionTitle}>
              Description
            </Text>
            <Text style = {styles.description}>
              {this.state.description}
            </Text>
          </View>
          <View style = {styles.sectionView}>
            <Text style = {styles.sectionTitle}>
              Comments
            </Text>
            <Comments />
          </View>
        </ScrollView>
      </View>
    );
  }

  goToGuestList(){
    alert('Guest list not implemented.');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'column',
  },
  photo: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 9 / 16,
  },
  titleView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 50,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  sectionView: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'center',
  },
  sectionTitle: {
    color: '#F26D6A',
    fontSize: 10,
  },
  dateTime: {

  },
  description: {

  },
});

module.exports = EventDetails;
