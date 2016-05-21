'use strict';

import React, {
  AsyncStorage,
  Component,
  ListView,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Firebase from 'firebase';

import Button from '../components/button';
import Header from '../components/header';
import Post from '../components/post';
import SearchBar from '../components/search-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class Following extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      refreshing: false,
    };
  }

  componentDidMount(){
    var ref = database.child("posts");
    var myBlob = [];
    var self = this;
    //this section loads the postIDs into myBlob and pushes them to dataSource
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        myBlob.push(childSnapshot.key().toString());

      });
      self.setState({dataSource: self.state.dataSource.cloneWithRows(myBlob)});
    });
  }

  onRefresh() {
  	this.setState({refreshing: true});
    setTimeout(() => {
      // Do some stuff
      this.setState({refreshing: false});
    }, 5000);
  }

  render() {
    return(
      <View>
        <Header
          navigator = {this.props.navigator}
          text = "Following"
          hasBack = {"true"}
        />

        <SearchBar />
        <ScrollView refreshControl = {
    			<RefreshControl
    				refreshing = {this.state.refreshing}
    				onRefresh = {this.onRefresh.bind(this)}
    				tintColor = "blue"
    				title = "Loading..."
    				titleColor = "black"
    				colors = {['#ffffff', '#b3b3b3', '#808080']}
    				progressBackgroundColor = "black"
    			/>
		    }>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {(rowData) =>
            <Post
              navigator = {this.props.navigator}
              id = {rowData}
            />
          }/>
        </ScrollView>
      </View>
    );
  }

  changePage(){
    alert("posts");
  }
}

module.exports = Following;
