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
            colors = {['white', '#F26D6A']}
            onRefresh = {this.onRefresh.bind(this)}
            progressBackgroundColor = '#DEB050'
    				refreshing = {this.state.refreshing}
            tintColor = "blue"
            title = "Loading..."
            titleColor = 'black'
          />
        }>
        {this.props.dataSource.map((element) => this.props.renderRow(element))}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

module.exports = GridView;
