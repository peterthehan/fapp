'use strict';

import React, {
  Component,
  Dimensions,
  RefreshControl,
  View,
} from 'react-native';

import Firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';

import GridView from '../components/grid-view';
import Profile from "../scenes/profile";
import SearchBar from '../components/search-bar';
import SceneStyles from '../styles/scene-styles';
import TitleBar from '../components/title-bar';
import SmallPost from '../components/small-post';

let database = new Firebase("poopapp1.firebaseio.com");

const windowSize = Dimensions.get('window');

class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      open: false,
    };
  }

  componentDidMount() {
    let self = this;

    database.child("posts").on("child_added", function(snapshot) {
      self.state.dataSource.push(snapshot);
      self.forceUpdate();
    });
  }

  renderRow(post) {
    return (
      <SmallPost
        navigator = {this.props.navigator}
        id = {post}
      />
    );
  }

  queryData() {
  }

  onSearchChange(text){
    alert (text);
  }

  render() {
    return(
      <View style = {SceneStyles.container}>
        <SearchBar onSearchChange = {this.onSearchChange}/>
        <GridView
          dataSource = {this.state.dataSource}
          onRefresh = {this.queryData.bind(this)}
          renderRow = {this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

module.exports = All;
