'use strict';

import React, {
  Component,
  View,
} from 'react-native';

import TitleBar from '../components/title-bar';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Logout"
        />
      </View>
    );
  }
}

module.exports = Logout;
