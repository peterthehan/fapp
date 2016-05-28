'use strict'

import React, {
  Component,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Comments from '../components/comments';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class PostDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      photo: ""
    };
  }

  componentDidMount() {
    var postSnapshot = this.props.state;
    this.setState({
      key: postSnapshot.key(),
      description: postSnapshot.val().description,
      photo: postSnapshot.val().photoID,
      rating: postSnapshot.val().rating,
      user: postSnapshot.val().user,
      userID: postSnapshot.val().userID,
    });
  }

  render() {
    return (
      <View style = {styles.container}>
        <TitleBar
          hasBack = {true}
          navigator = {this.props.navigator}
          text = {"Post Details"}
        />
        <ScrollView style = {styles.content}>
          <Image
            resizeMode = "cover"
            source = {this.state.photo}
            style = {styles.photo}
          />
          <View style = {styles.sectionView}>
            <Text style = {styles.sectionTitle}>
              Description
            </Text>
            <Text style = {styles.description}>
              {this.state.description}
            </Text>
          </View>
          <View style = {styles.sectionView}>
            <Text style = {styles.sectionTitle}>
              Comments
            </Text>
            <Comments
              navigator = {this.props.navigator}
              id = {this.state.key}
              type = {"posts"}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'column',
  },
  description: {
  },
  photo: {
    height: Dimensions.get("window").width * 9 / 16,
    width: Dimensions.get("window").width,
  },
  sectionTitle: {
    color: '#F26D6A',
    fontSize: 10,
  },
  sectionView: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    padding: 8,
  },
});

module.exports = PostDetails;
