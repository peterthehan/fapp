'use strict';

import React, {
  AsyncStorage,
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
import Following from './following';
import Setting from './setting';
import Camera from './camera';
import Profile from './profile';
import Notification from './notification';
import More from './more';
import TabBar from '../components/TabBar';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Post from '../components/post';

class Main extends Component {

  constructor(props) {
    super(props);
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
          <Following tabLabel = "Following"/>
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
        <ActionButton.Item buttonColor='#3498db' title="Setting" onPress={() => {this.props.navigator.push({component: Setting});}}>
          <Icon name="bell" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Profile" onPress={() => {this.props.navigator.push({component:Profile});}}>
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
