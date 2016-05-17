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
const styles = require('../styles/header-styles.js');
const FirebaseUrl = 'poopapp1.firebaseio.com';

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
  }
}
module.exports = Notification;
