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
import Home from './home';
import Follower from './follower';
import Camera from './camera';
import Notification from './notification';
import More from './more';
import TabBar from '../components/TabBar';

class Main extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return(
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
    );
  }
}

module.exports = Main;
