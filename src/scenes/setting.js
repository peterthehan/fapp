'use strict';

import React, {
  AsyncStorage,
  Component,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Firebase from 'firebase';

import Login from './login';

import Header from '../components/header';
import Button from '../components/button';

import SceneStyles from '../styles/scene-styles';
import ButtonStyles from '../styles/button-styles';

let database = new Firebase("poopapp1.firebaseio.com");

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      this.setState({
        user: user_data,
        loaded: true
      });
    });
  }

  render() {
    return(
      <View>
        <Header
          navigator = {this.props.navigator}
          text = "Settings"
          hasBack = {"true"}
        />
        <View>
        {
          this.state.user &&
            <View style = {SceneStyles.body}>
              <Text style = {styles.emailText}>
                {this.state.user.password.email}
              </Text>
              <Image
                style = {SceneStyles.image}
                source = {{uri: this.state.user.password.profileImageURL}}
              />
              <Text style = {styles.emailText}>
                {this.state.user.password.lastName}
              </Text>
              <Button
                text = "LOG OUT"
                onPress = {this.logout.bind(this)}
                buttonStyles = {ButtonStyles.primaryButton}
                buttonTextStyles = {ButtonStyles.primaryButtonText}
                underlayColor = {"#B18C40"}
              />
            </View>
        }
        </View>
      </View>
    );
  }

  logout() {
      AsyncStorage.removeItem('user_data').then(() => {
        database.unauth();
        this.props.navigator.resetTo({component: Login});
      });
  }
}

const styles = StyleSheet.create({
  emailText: {
    fontSize: 18
  }
});

module.exports = Setting;
