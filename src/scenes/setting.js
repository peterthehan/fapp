'use strict';

import React, {
  Component,
  Text,
  View
} from 'react-native';

class Setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <View>
        <Text>
          Settings Page
        </Text>
      </View>
    );
  }

};

module.exports = Setting;
