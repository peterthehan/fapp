'use strict';

import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class Comments extends Component {

  render() {
    var flexVar = this.props.flex;
    var newComment = '';

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

        <TextInput
          ref={'newCommentInput'}
          onSubmitEditing={(event) => this.updateText(event.nativeEvent.text)}
          placeholder = {"Add a comment"}
          placeholderTextColor = 'gray'
          underlineColorAndroid = 'gray'
        />
      </View>
    );
  }

  updateText(text){
    //database stuffff
    this.refs['newCommentInput'].clear();
    alert(text);
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
