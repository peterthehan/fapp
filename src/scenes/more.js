'use strict';

import React, {
  Component,
  ListView,
  Text,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';

import Following from './following';
import Setting from './setting';
import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Header from '../components/header';

class More extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Extra page 1', 'Extra page 2', 'Extra page 3']),
    };
  }

  render() {
    return(
      <View style = {styles.container}>
        <Header
          navigator = {this.props.navigator}
          text = "More"
        />
        {this.settingbutton()}
        {this.followingbutton()}
    </View>
    );
  }

  setting(){
    this.props.navigator.push({component: Setting});
  }

  settingbutton(){
    return (
      <TouchableHighlight onPress = {this.setting.bind(this)} underlayColor='gainsboro'>
        <View style = {styles.bubblechoice}>
          <Text style = {styles.icontext}>
            Setting
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  following(){
    this.props.navigator.push({component: Following});
  }

  followingbutton(){
    return (
      <TouchableHighlight onPress = {this.following.bind(this)} underlayColor='lemonchiffon'>
        <View style = {styles.bubblechoice}>
          <Text style = {styles.icontext}>
            Following
          </Text>
      </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent'
  },
  separator: {
    height: 30,
    backgroundColor: '#CCCCCC'
  },
  icontext: {
    color: '#5d5d5d',
    fontWeight: '400',
    fontSize: 18,
    backgroundColor: 'transparent',
    paddingLeft: 4,
    alignItems: 'stretch',
    marginTop: window.height/2.2,
    textAlign: 'left',
    margin: 10,
  },
  bubblechoice: {
    height: window.height/8,
    borderRadius: (window.height/8)/2,
    marginRight: 2,
    width: window.height/8,
  }
});

module.exports = More;
