'use strict';

import React, {
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Component,
  Alert,
  Text,
  Image,
  View
} from 'react-native';
import Button from '../components/button';
import ListItem from '../components/ListItem';
import StatusBar from '../components/StatusBar';
import Header from '../components/header';
import Firebase from 'firebase';
import ButtonStyles from '../styles/button-styles';
import SceneStyles from '../styles/scene-styles';
import HeaderStyles from '../styles/header-styles';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
let eventsRef = new Firebase("poopapp1.firebaseio.com");
let events = eventsRef.child('event');
const FirebaseUrl = 'poopapp1.firebaseio.com';
import Share from 'react-native-share';
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class Notification extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });
    this.state = {
      dataSource: ds.cloneWithRows([
        'You have 1 new follower: tester',
        'You followed tester'
      ])
    };

    this.notification = new Firebase("poopapp1.firebaseio.com/notification");
  }

  componenetDidMount() {
    this.listenForItems(this.notification);
  }

  getRef() {
    return new Firebase(FirebaseUrl);
  }

  listenForItems(notification) {
    notification.on('value', (snap) => {
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
  _renderItem(item) {
    const onPress = ()=>{
     Alert.alert(
      'Complete',
      null,
      [
        {text: 'Complete', onPress:(text)=>this.notification.child(item_key).remove()},
        {text: 'Cancel',onPress:(text) => console.log('Cancel')}
      ],
      'default'
     );
    };
    return (
      <ListItem item={item} onPress={() => {}} />

    );
  }
  generate(){
    alert("asdfafasf");
  }
  render() {
    return (
      /*<Image source = {require('../images/coco_color_0.jpg')} style={HeaderStyles.backgroundImage}>
      */
      <View style={{flex:1}}>
      <StatusBar title="Notification" />
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <TouchableOpacity onPress = {this.generate}>
            <View style = {{flex: 1, height: 50,
             padding: 10, borderWidth: 1,
            borderColor: '#003', alignItems: 'center'}}>
              <Text>{rowData}</Text>
            </View>
          </TouchableOpacity>
        }/>
          <View style={{flex:1}}/>

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
      /*</Image>*/
    );
  }

  createEvent(){
    //this.setState({loaded: false});
    alert("add clicked");

  }

  add(){
    <Button
      text = "add"
      onpress = {this.add.bind(this)}
      button_styles = {ButtonStyles.primaryButton}
      button_text_styles = {ButtonStyles.primaryButtonText}/>
    Alert.alert('add new task',
    null,
    [
      {
        text: 'Add',
        onPress: (text) => {
          this.notification.push({title: text});
        }
      },
    ],
    'plain-text'
  );
}

  tweet(){
    Share.open({
      share_text: "Hola mundo",
      share_URL: "http://google.cl",
      title: "Share Link",
      image: "http://www.technobuffalo.com/wp-content/uploads/2014/04/fast-food.jpg"
    },(e) => {
      console.log(e);
    });
  }

  remove(rowData){
    Alert.alert('delete notification'),
    null,
    [
      {
        text: 'delete',
        on
      }
    ]
    this.notification.child(rowData.id).remove();
  }
}
module.exports = Notification;
