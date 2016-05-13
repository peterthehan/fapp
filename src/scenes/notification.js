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
import ListItem from '../components/button';
import StatusBar from '../components/header';
import Firebase from 'firebase';
import ButtonStyles from '../styles/button-styles';
import HeaderStyles from '../styles/header-styles';
const styles = require('../styles/header-styles.js');
let eventsRef = new Firebase("poopapp1.firebaseio.com");
let events = eventsRef.child('event');
class Notification extends Component {

  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'add your events' }])
    })
  }

  listenForItems(events) {
    itemsRef.on('value', (snap) => {
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
  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Events" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>
        <Button
          text="Add"
          onPress={() => {}}
          button_styles = {ButtonStyles.primary_button}
          button_text_styles = {ButtonStyles.primary_button_text}/>
      </View>
    );
  }
}
module.exports = Notification;
