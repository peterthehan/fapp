'use strict';

const React = require('react-native');
const { AppRegistry } = React;

import LoginScene from './component/scene/login-scene'
import HomeScene from './component/scene/home-scene'

AppRegistry.registerComponent('PoopProject', () => LoginScene);
