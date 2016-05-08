'use strict';

import React from 'react';
import { AppRegistry, StyleSheet, Text } from 'react-native';
import Router from 'react-native-simple-router';

import LoginScene from './component/scene/login-scene'

// Your route object should contain at least:
// - The name of the route (which will become the navigation bar title)
// - The component object for the page to render
const firstRoute = {
  name: 'POOP',
  component: LoginScene,
};

class PoopApp extends React.Component {
  render() {
    return (
      <Router
        firstRoute = {firstRoute}
        headerStyle = {styles.header}
        titleStyle = {styles.title}
      />
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4CAF50',
  },
  title: {
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('PoopProject', () => PoopApp);
