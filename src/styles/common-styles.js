'use strict';

import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 9,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textinput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1
  },
  transparent_button: {
    margin: 6,
    padding: 12
  },
  transparent_button_text: {
    color: '#529ecc',
    fontSize: 16
  },
  primary_button: {
    margin: 10,
    padding: 12,
    borderColor: 'transparent',
    backgroundColor: '#529ecc'
  },
  primary_button_text: {
    color: '#FFF',
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100
  }
});
