'use strict';

import React, {
  Component,
  View
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Home from './home';
import Follower from './follower';
import Camera from './camera';
import Notification from './notification';
import More from './more';

class Main extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return(
      <ScrollableTabView>
        <Home tabLabel = "Home"/>
        <Follower tabLabel = "Follower"/>
        <Camera tabLabel = "Camera"/>
        <Notification tabLabel = "Notification"/>
        <More tabLabel = "More"/>
      </ScrollableTabView>
    );
  }
}

module.exports = Main;
