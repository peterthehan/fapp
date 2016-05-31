'use strict';

import React, {
  AsyncStorage,
  Component,
  Dimensions,
  RefreshControl,
  View,
} from 'react-native';

import Firebase from 'firebase';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TitleBar from '../components/title-bar';
import All from './all';
import Following from './following';

let database = new Firebase("poopapp1.firebaseio.com");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user_data', (error, result) => {
      this.setState({
        userID: JSON.parse(result).uid,
      });
    });
  }

  render() {
    return(
      <View style = {{flex: 1, backgroundColor: '#f3f3f3'}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Home"
        />
        <ScrollableTabView>
          <All
            navigator = {this.props.navigator}
            tabLabel = "All"
          />
          <Following
            navigator = {this.props.navigator}
            tabLabel = "Following"
            state = {this.state.userID}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

module.exports = Home;
