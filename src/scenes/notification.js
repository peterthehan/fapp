'use strict';

import React, {
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
let eventsRef = new Firebase("poopapp1.firebaseio.com");
let events = eventsRef.child('event');
class Notification extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });
    this.state = {
      dataSource: ds.cloneWithRows([
        'Post 1'])

    };

  }



 listenForItems(events) {
    events.on('value', (snap) => {
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
    return (
      <ListItem item={item} onPress={() => {}} />

    );
  }
  generate(){
    alert("asdfafasf");
  }
  render() {
    return (
      <View style={styles.container}>
        <Header text = "event" loaded = {'true'}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>
        <Button
          text="Add"
          onPress={this.createEvent.bind(this)}
          button_styles = {ButtonStyles.primary_button}
          button_text_styles = {ButtonStyles.primary_button_text}/>
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
  }
}
module.exports = Notification;
