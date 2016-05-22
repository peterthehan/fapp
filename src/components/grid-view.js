'use strict';

import React, {
  Component,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';

class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle = {styles.list}
        refreshControl = {
          <RefreshControl
    				refreshing = {this.state.refreshing}
            onRefresh = {this.onRefresh.bind(this)}
            tintColor = "blue"
            title = "Loading..."
            titleColor = "black"
            colors = {['white', '#B3B3B3', '#808080']}
            progressBackgroundColor = "black"
          />
        }>
        {this.props.dataSource.map(this.props.renderRow)}
      </ScrollView>
    );
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.props.onRefresh();
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 5000);
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

module.exports = GridView;
