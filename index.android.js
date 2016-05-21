'use strict';

import React, {
  AppRegistry,
  AsyncStorage,
  Component,
  Navigator,
  Text,
  View
} from 'react-native';

import Firebase from 'firebase';

import Header from './src/components/header';

import Login from './src/scenes/login';
import Main from './src/scenes/main';

console.ignoredYellowBox = ['Warning'];

let database = new Firebase("poopapp1.firebaseio.com");

// reference: http://www.sitepoint.com/authentication-in-react-native-with-firebase/
class PoopApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      component: null,
      loaded: false
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
            this.setState({component: Main});
          }
        });
      } else {
        this.setState({component: Login});
      }
    });
  }

  render() {
    if(this.state.component) {
      return (
        // reference: https://medium.com/@dabit3/react-native-navigator-navigating-like-a-pro-in-react-native-3cb1b6dc1e30#.q5hyx676n
        <Navigator
          initialRoute = {{component: this.state.component}}
          configureScene = {(route, routeStack) => {
            return Navigator.SceneConfigs.FloatFromRight
          }}
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
          <Header text = "React Native Firebase Auth" loaded = {this.state.loaded} />
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('PoopProject', () => PoopApp);
