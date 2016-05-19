'use strict';

import React, {
  Component,
  StyleSheet,
  View,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabBar from '../components/tab-bar';

import Camera from './camera';
import CreateEvent from './create-event';
import Following from './following';
import Home from './home';
import More from './more';
import Notification from './notification';
import Profile from './profile';
import Setting from './setting';

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
            <Home tabLabel = "Home" />
          </View>
          <View
            tabLabel = "users"
            style = {{flex: 1}}>
            <Following tabLabel = "Following" />
          </View>
          <View
            tabLabel = "camera"
            style = {{flex: 1}}>
            <Camera tabLabel = "Camera" />
          </View>
          <View
            tabLabel = "bell"
            style = {{flex: 1}}>
            <Notification tabLabel = "Notification" />
          </View>
          <View
            tabLabel = "bars"
            style = {{flex: 1}}>
            <More tabLabel = "More" />
          </View>
        </ScrollableTabView>

        <ActionButton
          buttonColor = "rgba(231,76,60,1)"
          bgColor = "rgba(0,0,0,0.1)"
          btnOutRange = "rgba(231,76,60,0.6)">
          <ActionButton.Item
            buttonColor = '#9b59b6'
            title = "New Event"
            onPress = {() => {this.props.navigator.push({component: CreateEvent});}}>
            <Icon
              name = "calendar-plus-o"
              style = {styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor = '#3498db'
            title = "Setting"
            onPress = {() => {this.props.navigator.push({component: Setting});}}>
            <Icon
              name = "bell"
              style = {styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor = '#1abc9c'
            title = "Profile"
            onPress = {() => {this.props.navigator.push({component: Profile});}}>
            <Icon
              name = "bars"
              style = {styles.actionButtonIcon}
            />
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
