'use strict';

import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class addComment extends Component {

  render() {
    var flexVar = this.props.flex;

    return (
      <View style={{flex:flexVar}}>
        <ScrollView
          removeClippedSubviews ={true}
          showsVerticalScrollIndicator ={true}
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          >
          {this.props.commentsArray}
        </ScrollView>
      </View>
    );
  }

  backButton(){
    if(this.props.hasBack) {
      return (
        <TouchableOpacity
          style = {styles.backButton}
          onPress = {() => this.props.navigator.pop()}>
          <Icon
            name = "arrow-back"
            size = {25}
            borderWidth = {7}
            color = "white"
            />
        </TouchableOpacity>
      );
    }
    else {
      return null;
    }
  }
}

var styles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  headerText: {
    color: '#FFF',
    fontSize: 18
  },
  headerImage: {
  },
  backButton: {
    position: 'absolute',
  }
});

module.exports = Comments;
