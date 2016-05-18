'use strict';

import React, {
  Component,
  Image,
  Text,
  View
} from 'react-native';

import HeaderStyles from '../styles/header-styles';

export default class Header extends Component {

  render() {
    return (
      <View style = {HeaderStyles.header}>
        <View style = {HeaderStyles.header_item}>
          <Text style = {HeaderStyles.header_text}>
            {this.props.text}
          </Text>
        </View>
        <View style = {HeaderStyles.header_item}>
          <Image style = {HeaderStyles.header_icon}
            source = {require('../images/logo.png')}>
          </Image>
        </View>
      </View>
    );
  }
}

module.exports = Header;
