'use strict';

import React, {
  Alert,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Component,
  Text,
  View
} from 'react-native';
import Button from '../components/button';
import ListItem from '../components/ListItem';
import StatusBar from '../components/StatusBar';
import Header from '../components/header';
import Firebase from 'firebase';
import ButtonStyles from '../styles/button-styles';
import HeaderStyles from '../styles/header-styles';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
const styles = require('../styles/header-styles.js');
<<<<<<< HEAD
let eventsRef = new Firebase("poopapp1.firebaseio.com");
let events = eventsRef.child('event');
=======
const FirebaseUrl = 'poopapp1.firebaseio.com';
>>>>>>> 70d16e548c50361a73257d6cbe96c6b65652f669

class Notification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1,row2) => row1 != row2,
      })
    };
    this.notification = this.getRef().child('notification');
  }

<<<<<<< HEAD
 listenForItems(events) {
    events.on('value', (snap) => {
=======
  getRef() {
    return new Firebase(FirebaseUrl);
  }

  listenForItems(notification) {
    notification.on('value', (snap) => {
>>>>>>> 70d16e548c50361a73257d6cbe96c6b65652f669
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key()
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.notification);
  }

  _renderItem(item) {
    const onPress = ()=>{
      Alert.alert(
        'Complete!',
        null,
        [
          {text: 'Complete',onPress:(text)=>this.notification.child(item._key).remove()}
        ]
      )
    }
    return (
      <ListItem item={item} onPress={() => {}} />
    );
  }
  generate(){
    alert("asdfafasf");
  }
  render() {
    return (
      <View style={styles.container2}>

        <StatusBar title="Notification" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>
<<<<<<< HEAD
        <ActionButton buttonColor="rgba(231,76,60,1)" bgColor="rgba(0,0,0,0.1)" btnOutRange="rgba(231,76,60,0.6)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={this.createEvent.bind(this)}>
            <Icon name="calendar-plus-o" size={20} color="white" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {alert("Notifications Task tapped!")}}>
            <Icon name="bell" size={20} color="white" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {alert("All Task tapped!")}}>
            <Icon name="bars" size={20} color="white" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }

  createEvent(){
    //this.setState({loaded: false});
    alert("add clicked");

    /*app.authWithPassword({
      "email": this.state.email,
      "password": this.state.password
      },
      (error, user_data) => {
      this.setState({loaded: true});

      if(error) {
        alert('createEvent Failed. Please try again');
      } else {
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        this.props.navigator.push({component: notification.js});
      }
    });*/
=======
        <Button
          text="addTest"
          onPress={this.add.bind(this)}
          button_styles = {ButtonStyles.primary_button}
          button_text_styles = {ButtonStyles.primary_button_text}/>
      </View>
    );
  }
  add(){
    Alert.alert(
      'add new event',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {this.notification.push({title: text})
          }
        }
      ]
    )
>>>>>>> 70d16e548c50361a73257d6cbe96c6b65652f669
  }
}
module.exports = Notification;
