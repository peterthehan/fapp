'use strict';

import React, {
  Component,
  StyleSheet,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabBar from '../components/tab-bar';

import Camera from './camera';
import Event from './event';
import Following from './following';
import Home from './home';
import More from './more';
import Notification from './notification';

class Main extends Component {

  render() {
    return(
      <View style = {{flex:1, backgroundColor: '#f3f3f3'}}>
        <ScrollableTabView
          tabBarPosition = "bottom"
          renderTabBar = {() => <TabBar />}>
          <View
            tabLabel = "home"
            style = {{flex: 1}}>
            <Home
              navigator = {this.props.navigator}
              tabLabel = "Home" />
          </View>
          <View
            tabLabel = "event"
            style = {{flex: 1}}>
            <Event
              navigator = {this.props.navigator}
              tabLabel = "Event" />
          </View>
          <View
            tabLabel = "camera"
            style = {{flex: 1}}>
            <Camera
              navigator = {this.props.navigator}
              tabLabel = "Camera" />
          </View>
          <View
            tabLabel = "bell"
            style = {{flex: 1}}>
            <Notification
              navigator = {this.props.navigator}
              tabLabel = "Notification" />
          </View>
          <View
            tabLabel = "bars"
            style = {{flex: 1}}>
            <More
              navigator = {this.props.navigator}
              tabLabel = "More" />
          </View>
        </ScrollableTabView>
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
