'use strict';

import React, {
  Alert,
  AsyncStorage,
  Component,
  ListView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';

import Button from '../components/button';
import TextStyles from '../styles/text-styles';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com/");

class Notification extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: ds.cloneWithRows([
        'You have 1 new follower: tester',
        'You followed tester'
      ])
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user_data', (error, result) => {
      this.setState({
        userID: JSON.parse(result).uid,
      });
    });
    this.listenForItems();
  }

  listenForItems() {
    var data = database.child('post')
    data.on("child_added", function(snapshot, prevChildKey) {
      var newPost = snapshot.val();
      alert ("create post");
    });
  }

  render() {
    {this.listenForItems()}
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Notification"
        />
        <View style = {{flex:1, backgroundColor: 'white'}}>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {(rowData) =>
            <TouchableOpacity onPress = {this.generate} underlayColor = 'lemonchiffon'>
              <View style = {{flex: 1, height: 50, backgroundColor: 'azure', padding: 10, alignItems: 'center'}}>
                <Text style = {TextStyles.text}>
                  {rowData}
                </Text>
              </View>
            </TouchableOpacity>
          }
        />
        </View>
      </View>
    );
  }

  following(){
  }

  posts(){
  }

  events(){
  }

}

module.exports = Notification;
