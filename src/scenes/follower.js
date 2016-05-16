'use strict';

import React, {
  Component,
  ListView,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import SearchBar from '../search-bar';
import HeaderStyles from '../styles/header-styles';

class Follower extends Component {

  constructor() {
    super();
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

  _onRefresh() {
  	this.setState({refreshing: true});
    setTimeout(() => {
      // Do some stuff
      this.setState({refreshing: false});
    }, 5000);
  }

  render() {
    return(
      <View style = {HeaderStyles.container}>
        <SearchBar />
        <ScrollView refreshControl={
    			<RefreshControl
    				refreshing={this.state.refreshing}
    				onRefresh={this._onRefresh.bind(this)}
    				tintColor="blue"
    				title="Loading..."
    				titleColor="black"
    				colors={['#ffffff', '#b3b3b3', '#808080']}
    				progressBackgroundColor="black"
    			/>
		    }>
          <ListView
            dataSource = {this.state.dataSource}
            renderRow = {(rowData) =>
              <TouchableOpacity onPress = {this.changePage}>
                <View style = {{height: 50, padding: 10, borderWidth: 1, borderColor: '#000', alignItems: 'center'}}>
                  <Text>{rowData}</Text>
                </View>
              </TouchableOpacity>
            }/>
        </ScrollView>
      </View>
    );
  }

  changePage(){
    alert("posts");
  }
}

module.exports = Follower;
