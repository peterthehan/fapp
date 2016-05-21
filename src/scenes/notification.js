'use strict';

import React, {
  Alert,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';

import Button from '../components/button';
import Header from '../components/header';

import ButtonStyles from '../styles/button-styles';
import HeaderStyles from '../styles/header-styles';
import SceneStyles from '../styles/scene-styles';

let events = new Firebase("poopapp1.firebaseio.com/events");
let notifications = new Firebase("poopapp1.firebaseio.com/notification");

class Notification extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: ds.cloneWithRows([
        'You have 1 new follower: tester',
        'You followed tester'
      ])
    };
  }

  componenetDidMount() {
    this.listenForItems(notifications);
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

  render() {
    return (
      <View style = {{flex: 1}}>
        <Header
          navigator = {this.props.navigator}
          text = "Notification"
        />
        <View style = {{flex:1, backgroundColor: 'white'}}>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {(rowData) =>
            <TouchableOpacity onPress = {this.generate} underlayColor = 'lemonchiffon'>
              <View style = {{flex: 1, height: 50, backgroundColor: 'dodgerblue', padding: 10, alignItems: 'center'}}>
                <Text style = {SceneStyles.text}>
                  {rowData}
                </Text>
              </View>
            </TouchableOpacity>
          }
        />
        </View>
      </View>
    );
  }

  /*
  add(){
    <Button
      text = "add"
      onpress = {this.add.bind(this)}
      button_styles = {ButtonStyles.primaryButton}
      button_text_styles = {ButtonStyles.primaryButtonText}
    />
    Alert.alert(
      'add new task',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            notifications.push({title: text});
          }
        }
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
    }, (e) => {
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
    notifications.child(rowData.id).remove();
  }
  */
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

module.exports = Notification;
