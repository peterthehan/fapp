'use strict';

import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  body: {
    flex: 9,
    alignItems: 'center',
  },
  textinput: {
    height: 40,
    borderWidth: 1
  },
  transparent_button: {
    margin: 6,
    padding: 12
  },
  transparent_button_text: {
    color: '#fff',
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
