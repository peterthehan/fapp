'use strict'

import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import ButtonStyles from '../styles/button-styles';
import HeaderStyles from '../styles/header-styles';

import Main from './main';

let database = new Firebase("poopapp1.firebaseio.com");

export default class EventPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>

        <View style={{flex:1}}>
          <View>
            <View><Text>image</Text></View>
            <View>
              <View><Text>title</Text></View>
              <View><Text>when</Text></View>
              <View><Text>where</Text></View>
            </View>
            <View><Text>description</Text></View>
          </View>
        </View>
        <View style={{flex:3}}><Text>comments</Text></View>
      </View>
    );
  }
}
module.exports = EventPage;
