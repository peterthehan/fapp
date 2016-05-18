'use strict';

import React, {
  StyleSheet,
  Text,
  ScrollView,
  ListView,
  Component,
  View
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CreateEvent from './create-event';
import Home from './home';
import Follower from './follower';
import Camera from './camera';
import Notification from './notification';
import More from './more';
import TabBar from '../components/TabBar';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
class Main extends Component {

  constructor() {
    super();
    this.state = {
    };

  }

  render() {
    return(
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>

      <ScrollableTabView tabBarPosition="bottom" renderTabBar={() => <TabBar />}>
        <View tabLabel="home" style={{flex: 1}}>
          <Home tabLabel = "Home"/>
        </View>
        <View tabLabel="users" style={{flex: 1}}>
          <Follower tabLabel = "Follower"/>
        </View>
        <View tabLabel="camera" style={{flex: 1}}>
          <Camera tabLabel = "Camera"/>
        </View>
        <View tabLabel="bell" style={{flex: 1}}>
          <Notification tabLabel = "Notification"/>
        </View>
        <View tabLabel="bars" style={{flex: 1}}>
          <More tabLabel = "More"/>
        </View>
      </ScrollableTabView>

      <ActionButton buttonColor="rgba(231,76,60,1)" bgColor="rgba(0,0,0,0.1)" btnOutRange="rgba(231,76,60,0.6)">
        <ActionButton.Item buttonColor='#9b59b6' title="New Event" onPress={() => {this.props.navigator.push({component: CreateEvent});}}>
          <Icon name="calendar-plus-o" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="New Post" onPress={() => {alert("Notifications Task tapped!")}}>
          <Icon name="bell" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="All Events" onPress={() => {alert("All Task tapped!")}}>
          <Icon name="bars" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
module.exports = Main;
