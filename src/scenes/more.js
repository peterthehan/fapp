'use strict';

import React, {
  AsyncStorage,
  Component,
  StyleSheet,
  View,
} from 'react-native';

import About from './about';
import Button from '../components/button';
import Profile from './profile';
import Setting from './setting';
import TitleBar from '../components/title-bar';

class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user_data', (error, result) => {
      this.setState({
        userID: JSON.parse(result).uid,
      });
    });
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "More"
        />
        <Button
          buttonStyles = {{}}
          buttonTextStyles = {styles.buttonStyle}
          onPress = {this.profile.bind(this)}
          text = "Profile"
          underlayColor = {'gray'}
        />
        <Button
          buttonStyles = {{}}
          buttonTextStyles = {styles.buttonStyle}
          onPress = {this.setting.bind(this)}
          text = "Settings"
          underlayColor = {'gray'}
        />
        <Button
          buttonStyles = {{}}
          buttonTextStyles = {styles.buttonStyle}
          onPress = {this.about.bind(this)}
          text = "About"
          underlayColor = {'gray'}
        />
      </View>
    );
  }

  profile() {
    this.props.navigator.push({component: Profile, state: this.state.userID});
  }

  setting() {
    this.props.navigator.push({component: Setting, state: this.props.state});
  }

  about() {
    this.props.navigator.push({component: About});
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'stretch',
    fontSize: 18,
    margin: 14,
    textAlign: 'left',
  },
});

module.exports = More;
