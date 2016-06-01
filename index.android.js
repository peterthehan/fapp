'use strict';

import React, {
  AppRegistry,
  AsyncStorage,
  BackAndroid,
  Component,
  Navigator,
  Text,
  View
} from 'react-native';

import Firebase from 'firebase';

import Login from './src/scenes/login';
import Main from './src/scenes/main';

let database = new Firebase("poopapp1.firebaseio.com");

console.ignoredYellowBox = ['Warning'];

class Fapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: null
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      if(user_data != null) {
        database.authWithCustomToken(user_data.token, (error, authData) => {
          if(error) {
            this.setState({component: Login});
          } else {
            const self = this;
            database.once("value", function(snapshot) {
              if(snapshot.child("users").hasChild(authData.uid)) {
                self.setState({component: Main});
              } else {
                self.setState({component: Login});
              }
            });
          }
        });
      } else {
        this.setState({component: Login});
      }
    });
  }

  bindBackButton(navigator) {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if(navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
      } else {
        return false;
      }
    });
  }

  render() {
    if(this.state.component) {
      return (
        <Navigator
          configureScene = {(route, routeStack) => {
            return Navigator.SceneConfigs.FloatFromRight
          }}
          initialRoute = {{component: this.state.component}}
          ref = {(nav) => {this.bindBackButton(nav);}}
          renderScene = {(route, navigator) => {
            if(route.component) {
              return (
                <route.component navigator = {navigator} state = {route.state}/>
              );
            }
          }}
        />
      );
    } else {
      return (
        <View>
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('Fapp', () => Fapp);
