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
  listview: {
    flex: 1,
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  title: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  text: {
    color: '#333',
    fontSize: 16,
  },
  body: {
    flex: 9,
    alignItems: 'center'
  },
  textinput: {
    height: 40,
    borderWidth: 1,
    color: 'white'
  },
  seperator:{
    marginBottom: 20
  },
  image: {
    width: 100,
    height: 100
  }
});
