'use strict';

import React, {
  Component,
  Text,
  Image,
  View,
} from 'react-native';

import TabBar from '../components/tab-bar';
import TitleBar from '../components/title-bar';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <View style = {{flex: 1}}>
        <TitleBar
          hasBack = {"true"}
          navigator = {this.props.navigator}
          text = "About"
        />
        <Text> Come download our gorgeous app! </Text>
      </View>
    );
  }
}

module.exports = About;
