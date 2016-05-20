'use strict';

import React, {
  Component,
  Text,
  View
} from 'react-native';

import Header from '../components/header';
let database = new Firebase("poopapp1.firebaseio.com");

class Setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      profilePic: '',
      visibility: '',
      notification: ''
    };
  }

  render() {
    return(
      <View>
        <Header
          navigator = {this.props.navigator}
          text = "Setting"
        />

      </View>
    );
  }

};

module.exports = Setting;
