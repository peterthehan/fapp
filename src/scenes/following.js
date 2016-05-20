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

import SearchBar from '../search-bar';
import Post from '../components/post';

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

  // TODO move this to POST UI
  createPost(){
    AsyncStorage.getItem('user_data', (error, result) =>{
      alert("making a post...");
      var ref = database.child("posts");
      ref.push({
        user: "Mickey Mouse",
        photoID: "http://thewoksoflife.com/wp-content/uploads/2015/02/soy-sauce-chicken-9.jpg",
        userID: JSON.parse(result).uid,
        description: "I like big butts",
        rating: 5,
      });
    });
  }

  render() {
    return(
      <View>
        <TouchableOpacity onPress={this.createPost}>
          <Text>
            touch me
          </Text>
        </TouchableOpacity>

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
            <Post id={rowData}/>
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
