'use strict';

import React, {
  Component,
  ListView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class More extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Extra page 1', 'Extra page 2', 'Extra page 3']),
    };
  }

  render() {
    return(
      <ListView
        dataSource = {this.state.dataSource}
        renderRow = {(rowData) =>
          <TouchableOpacity onPress = {this.changePage}>
            <View style = {{height: 50, padding: 10, borderWidth: 1, borderColor: '#000', alignItems: 'center'}}>
              <Text>{rowData}</Text>
            </View>
          </TouchableOpacity>
        }/>
    );
  }

  changePage(){
    alert("ASDF");
  }
}

module.exports = More;
