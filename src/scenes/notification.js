'use strict';

import React, {
  Alert,
  Component,
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
import TitleBar from '../components/title-bar';

import ButtonStyles from '../styles/button-styles';
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
        <TitleBar
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

  following(){

  }

  posts(){

  }

  events(){

  }

}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: '#FFF',
  },
});

module.exports = Notification;
