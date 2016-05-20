'use strict';

import React, {
  Component,
  Text,
  View
} from 'react-native';

import Header from '../components/header';

class Setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <View>
        <Header
          navigator = {this.props.navigator}
          text = "Setting"
          hasBack = {true}
      />
      </View>
    );
  }

};

module.exports = Setting;
