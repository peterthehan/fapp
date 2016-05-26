'use strict'

import React, {
  Component,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Comments from '../components/comments';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: false,
    }
  }

  componentDidMount() {
    var eventSnapshot = this.props.state;
    this.setState({
      key: eventSnapshot.key(),
      description: eventSnapshot.val().description,
      endDate: eventSnapshot.val().endDate,
      endTime: eventSnapshot.val().endTime,
      isPublic: eventSnapshot.val().isPublic,
      photo: eventSnapshot.val().photo,
      startDate: eventSnapshot.val().startDate,
      startTime: eventSnapshot.val().startTime,
      title: eventSnapshot.val().title,
    });
  }

  render() {
    return (
      <View style = {styles.container}>
        <TitleBar
          hasBack = {true}
          navigator = {this.props.navigator}
          text = {"Event Details"}
        />
        <ScrollView style = {styles.content}>
          <Image
            resizeMode = "cover"
            source = {{uri: this.state.photo}}
            style = {styles.photo}
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
            <Comments
              id = {this.state.key}
              type = {"events"}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  goToGuestList() {
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
  dateTime: {
  },
  description: {
  },
  photo: {
    height: Dimensions.get("window").width * 9 / 16,
    width: Dimensions.get("window").width,
  },
  sectionTitle: {
    color: '#F26D6A',
    fontSize: 10,
  },
  sectionView: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    padding: 8,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  titleView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    bottom: 0,
    height: 50,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
});

module.exports = EventDetails;
