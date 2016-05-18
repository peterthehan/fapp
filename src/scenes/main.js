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
const styles = require('../styles/header-styles.js');

class Main extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return(
      <ScrollableTabView renderTabBar={() => <TabBar />}>
        <View tabLabel="home" style={styles.container}>
          <Home tabLabel = "Home"/>
        </View>
        <View tabLabel="users" style={styles.container}>
          <Follower tabLabel = "Follower"/>
        </View>
        <View tabLabel="camera" style={styles.container}>
          <Camera tabLabel = "Camera"/>
        </View>
        <View tabLabel="bell" style={styles.container}>
          <Notification tabLabel = "Notification"/>
        </View>
        <View tabLabel="bars" style={styles.container}>
          <More tabLabel = "More"/>
        </View>
      </ScrollableTabView>
    );
  }
}

module.exports = Main;
