'use strict'

import React, {
  Component,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Comments from '../components/comments';
import TitleBar from '../components/title-bar';
import GridView from '../components/grid-view';

let database = new Firebase("poopapp1.firebaseio.com");

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      photo: 'default',
      modalVisible: false,
    }
  }

  componentDidMount() {
    var eventSnapshot = this.props.state;
    var self = this;
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

    var loggedUserId = database.getAuth().uid;
    self.setState({
      loggedUser: loggedUserId,
    });

    database.child("events/").on("value", function(snapshot) {
      var isGoing = 'no';
      var myBlob = [];
      var goingList = snapshot.child(eventSnapshot.key() + "/goingList");

      if(typeof goingList != 'undefined') {
        goingList.forEach(function(going) {
          database.child("users/" + going.val().userID).on("value", function(userSnapshot) {
            var proPic = userSnapshot.val().profilePic;
            var name = userSnapshot.val().firstName + " " + userSnapshot.val().lastName;
            myBlob.push({profilePic: proPic, username: name});
          });


          if(going.val().userID == loggedUserId) {
            isGoing = 'yes';
          }
        });
      }
      var numGoing = snapshot.child(eventSnapshot.key() + "/going");

      self.setState({
        status: isGoing,
        numberGoing: numGoing.val(),
        dataSource: myBlob,
      });
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
            source = {this.state.photo}
            style = {styles.photo}
          >
            <View style = {styles.titleView}>
              <Text style = {styles.title}>
                {this.state.title}
              </Text>
            </View>
          </Image>
          <View style = {styles.sectionView}>
            <View style = {styles.statusView}>
            <TouchableOpacity
              onPress = {() => this.setModalVisible(true)}
              style = {styles.statusButton}>
              <Text>
                {this.state.numberGoing}
              </Text>
              <Text style = {[styles.statusText, {color: 'gray'}]}>
                Who is going?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress = {() => this.goingButton()}
              style = {styles.statusButton}
              disabled = {this.state.status === 'yes' ? true : false}>
              <MaterialIcon
                color = {this.state.status === 'yes' ? '#F26D6A' : 'gray'}
                name = 'restaurant'
                size = {16}
              />
              <Text style = {[styles.statusText, {color: this.state.status === 'yes' ? '#F26D6A' : 'gray'}]}>
                Going
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress = {() => this.notGoingButton()}
              style = {styles.statusButton}
              disabled = {this.state.status === 'no' ? true : false}>
              <MaterialIcon
                color = {this.state.status === 'no' ? '#F26D6A' : 'gray'}
                name = 'hotel'
                size = {16}
              />
              <Text style = {[styles.statusText, {color: this.state.status === 'no' ? '#F26D6A' : 'gray'}]}>
                Not going
              </Text>
            </TouchableOpacity>
            </View>
          </View>
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
              navigator = {this.props.navigator}
              id = {this.state.key}
              type = {"events"}
            />
          </View>
        </ScrollView>
        <Modal
          onRequestClose = {() => {this.setModalVisible(false)}}
          visible = {this.state.modalVisible}>
          <View style = {styles.containerModal}>
            <View style = {styles.modalUserBar}>
              <TouchableOpacity onPress = {() => {this.setModalVisible(false);}}>
                <MaterialIcon
                  borderWidth = {7}
                  color = 'black'
                  name = 'close'
                  size = {25}
                />
              </TouchableOpacity>
            </View>
            <GridView
              dataSource = {this.state.dataSource}
              onRefresh = {this.queryData.bind(this)}
              renderRow = {this.renderRow.bind(this)}
            />
          </View>
        </Modal>
      </View>
    );
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  goingButton(){
    database.child("events/" + this.state.key + "/goingList").push({userID: this.state.loggedUser});

    var numGoing = database.child("events/" + this.state.key + "/going");
    numGoing.transaction(function(currentGoing) {
      return currentGoing + 1;
    });
  }

  notGoingButton(){
    var self = this;
    var numGoing = database.child("events/" + this.state.key + "/going");

    database.child("events/").once("value", function(snapshot) {
      var goingList = snapshot.child(self.state.key + "/goingList");
      if(typeof goingList != 'undefined') {
        goingList.forEach(function(request) {
          if(request.val().userID == self.state.loggedUser) {
            var toDelete = database.child("events/" + self.state.key + "/goingList/" + request.key().toString() + "/userID");
            toDelete.set(null);
          }
        });
      }

      numGoing.transaction(function(currentGoing) {
        return currentGoing - 1;
      });
    });
  }

  renderRow(friend) {
    return (
      <View style = {styles.friendContainer}>
        <View style = {styles.friendTouchView}>
          <Image
            style = {styles.friendUserImage}
            source = {friend.profilePic}
          />
          <View style = {styles.friendNameView}>
            <Text style = {styles.friendName}>
              {friend.username}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  queryData() {

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'column',
  },
  statusView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statusButton: {
    alignItems: 'center',
    flex: 1,
  },
  statusText: {

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
  containerModal: {
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  modalUserBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  friendContainer: {
    width: Dimensions.get("window").width,
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  friendUserImage: {
    width: 25,
    height: 25,
    margin: 10,
  },
  friendTouchView: {
    flexDirection: 'row',
  },
  friendNameView: {
    flex: 1,
    padding: 6,
  },
  friendName: {
  }
});

module.exports = EventDetails;
