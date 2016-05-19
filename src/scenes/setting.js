'use strict';

import React, {
  Component,
  ListView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


import Firebase from 'firebase';
let app = new Firebase("poopapp1.firebaseio.com");
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderStyles from '../styles/header-styles';
import Home from './home';
import Button from '../components/button';

import ButtonStyles from '../styles/button-styles';
import SceneStyles from '../styles/scene-styles';

class Setting extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'Post 1',
        'Post 2',
        'Post 3',
        'Post 4',
        'Post 5',
        'Post 6',
        'Post 7',
        'Post 8',
        'Post 9',
        'Post 10',
        'Post 11',
        'Post 12',
        'Post 13',
        'Post 14',
        'Post 15',
        'Post 16',
        'Post 17',
        'Post 18',
        'Post 19'
      ]),
      refreshing: false,
    };
  }

  render() {
    return(
      <View style = {HeaderStyles.container}>
      <ActionButton.Item buttonColor='#1abc9c' title="Profile"onPress={() => {alert ("adf");}}>
        <Icon name="bars" style={styles.actionButtonIcon} />
      </ActionButton.Item>

          <ListView
            dataSource = {this.state.dataSource}
            renderRow = {(rowData) =>
              <TouchableOpacity onPress={() => {alert ("Notifications Task tapped!");}}>
                <View style = {{height: 50, padding: 10, borderWidth: 1, borderColor: '#000', alignItems: 'center'}}>
                  <Text>{rowData}</Text>
                </View>
              </TouchableOpacity>
            }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});


module.exports = Setting;
