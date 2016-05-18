'use strict';

import React, {
  Component,
  ListView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // this would be the name of poster retreived from database
      name: "Mickey Mouse"
    };
  }

  render() {
    return(
      <View style={styles.postContainer}>

        <View style={styles.postHead}>
          <TouchableOpacity style={styles.horizontalView}>
            <View style={{padding: 5, marginBottom: 5}}>
              <Image style={styles.posterPic} source={require('../images/profilepic.jpg')} />
            </View>
            <View style={{padding: 5, marginBottom: 5}}>
              <Text style={styles.posterName}>
                {this.state.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.postImage}>
          <Image style={styles.image} source={require('../images/foodpic.jpg')} />
        </View>

        <View style={styles.horizontalView}>
          <Text style={styles.rating}>
            6
          </Text>
          <TouchableOpacity style={styles.ratingButton}>
              <Icon name="thumbs-o-up" size={20} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ratingButton}>
              <Icon name="thumbs-o-down" size={20} color="red" />
          </TouchableOpacity>
        </View>

        <View style={styles.descriptContainer}>
          <Text style={styles.descText}>
            This is a delicious chicken that I had at 64 degrees! I am Mickey Mouse. I eat at 64 after CSE 101 every day!
          </Text>
        </View>

      </View>
    );
  }
}

const windowSize = Dimensions.get('window');
var styles = StyleSheet.create({
    postContainer: {
        padding: 15,
        borderWidth: 1,
    },
    postHead: {
        flex: 1,
    },
    horizontalView: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flex:1,
    },
    posterName: {
        fontSize: 20,
        padding: 5,
        color: '#000000',
    },
    posterPic: {
        height: 40,
        borderRadius: 90,
        width: 40,
    },
    postImage: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 350,
      height: 350,
    },
    rating: {
      padding: 5,
      marginRight: 15,
      marginLeft: 15,
      marginTop: 10,
      fontSize: 20,
    },
    ratingButton:{
      padding: 5,
      marginRight: 5,
      marginLeft: 5,
      marginTop: 10,

    },
    descriptContainer: {

    },
    descText: {

    }

});

module.exports = Post;
