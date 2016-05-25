'use strict';

import React, {
  AsyncStorage,
  Component,
  ListView,
  StyleSheet,
  View,
} from 'react-native';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Following from './following';
import Profile from './profile';
import Setting from './setting';
import TitleBar from '../components/title-bar';

class More extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Extra page 1', 'Extra page 2', 'Extra page 3']),
    };
  }

  componentDidMount() {
    var self = this;
    AsyncStorage.getItem('user_data', (error, result) => {
      self.setState({
        userID: JSON.parse(result).uid,
      });
    });
  }

  render() {
    return(
      <View style = {styles.container}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "More"
        />
        <Button
          buttonStyles = {styles.bubblechoice}
          buttonTextStyles = {styles.icontext}
          onPress = {this.profile.bind(this)}
          text = "Profile"
          underlayColor = {'gray'}
        />
        <Button
          buttonStyles = {styles.bubblechoice}
          buttonTextStyles = {styles.icontext}
          onPress = {this.following.bind(this)}
          text = "Following"
          underlayColor = {'gray'}
        />
        <Button
          buttonStyles = {styles.bubblechoice}
          buttonTextStyles = {styles.icontext}
          onPress = {this.setting.bind(this)}
          text = "Settings"
          underlayColor = {'gray'}
        />
    </View>
    );
  }

  profile() {
    this.props.navigator.push({component: Profile, state: this.state.userID});
  }

  setting() {
    this.props.navigator.push({component: Setting, state: this.state.userID});
  }

  following() {
    this.props.navigator.push({component: Following});
  }
}

const styles = StyleSheet.create({
  bubblechoice: {
    borderRadius: (window.height / 8) / 2,
    height: window.height / 8,
    marginRight: 2,
    width: window.height / 8,
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-start',
  },
  icontext: {
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    color: '#5D5D5D',
    fontSize: 18,
    fontWeight: '400',
    margin: 10,
    marginTop: window.height / 2.2,
    paddingLeft: 4,
    textAlign: 'left',
  },
  separator: {
    backgroundColor: '#CCCCCC',
    height: 30,
  },
});

module.exports = More;
