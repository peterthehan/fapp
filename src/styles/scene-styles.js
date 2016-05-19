'use strict';

import React, {StyleSheet} from 'react-native';

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
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center'
  },
  textInput: {
    height: 40,
    color: 'white',
    marginLeft: 30,
    marginRight: 30
  },
  firstName: {
    flex: 1,
    height: 40,
    color: 'white',
    marginLeft: 30
  },
  lastName: {
    flex: 1,
    height: 40,
    color: 'white',
    marginRight: 30
  },
  oneLine: {
    flexDirection: 'row'
  }
});
