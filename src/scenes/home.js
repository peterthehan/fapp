'use strict';

import React, {
  Component,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import GridView from '../components/grid-view';
import Header from '../components/header';
import SearchBar from '../components/search-bar';

const pictures = [
  "https://pbs.twimg.com/profile_images/723442376933396481/V3QBgFkA.jpg",
  "https://pbs.twimg.com/profile_images/597793076514426880/qka9dYR-_400x400.jpg",
  "http://static.wixstatic.com/media/95a3cf_dc7f0c0841ed4228bc6c9a8937a9878e.jpg_256",
  "http://mediad.publicbroadcasting.net/p/wamc/files/styles/medium/public/201401/Fruit_%26_vegs_assortment_0.jpg",
  "https://pbs.twimg.com/profile_images/723442376933396481/V3QBgFkA.jpg",
  "https://pbs.twimg.com/profile_images/597793076514426880/qka9dYR-_400x400.jpg",
  "http://static.wixstatic.com/media/95a3cf_dc7f0c0841ed4228bc6c9a8937a9878e.jpg_256",
  "http://mediad.publicbroadcasting.net/p/wamc/files/styles/medium/public/201401/Fruit_%26_vegs_assortment_0.jpg",
  "https://pbs.twimg.com/profile_images/723442376933396481/V3QBgFkA.jpg",
  "https://pbs.twimg.com/profile_images/597793076514426880/qka9dYR-_400x400.jpg",
  "http://static.wixstatic.com/media/95a3cf_dc7f0c0841ed4228bc6c9a8937a9878e.jpg_256",
  "http://mediad.publicbroadcasting.net/p/wamc/files/styles/medium/public/201401/Fruit_%26_vegs_assortment_0.jpg",
  "https://pbs.twimg.com/profile_images/723442376933396481/V3QBgFkA.jpg",
  "https://pbs.twimg.com/profile_images/597793076514426880/qka9dYR-_400x400.jpg",
  "http://static.wixstatic.com/media/95a3cf_dc7f0c0841ed4228bc6c9a8937a9878e.jpg_256",
  "http://mediad.publicbroadcasting.net/p/wamc/files/styles/medium/public/201401/Fruit_%26_vegs_assortment_0.jpg",
];

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    let posts = Array.apply(null, Array(pictures.length)).map((v, i) => {
      return {
        src: pictures[i],
        isFavorite: false, // TODO: should check in database for user
        // TODO: put other information about post from database here (or maybe just send the entire database entry snapshot)
      }
    });
    this.setState({items: posts});
  }

  picture(post){
    alert("Enlarge picture (" + post.src + ").");
  }

  favorite(post){
    post.isFavorite = !post.isFavorite;
    // TODO: update database

    // this is probably bad because it rerenders the entire scene. only really needs to update the Icon's color prop
    this.forceUpdate();
  }

  messages(post){
    alert("Go to messages page.");
  }

  getFavoriteColor(post){
    if(post.isFavorite) {
      return "orange";
    } else {
      return "gray";
    }
  }

  renderRow(post) {
    return (
      <View style = {styles.item}>
        <TouchableOpacity
          style = {styles.photo}
          onPress = {() => this.picture(post)}>
          <Image
            resizeMode = "cover"
            style = {{flex: 1}}
            source = {{uri: post.src}}
          />
        </TouchableOpacity>
        <View style = {styles.buttonView}>
          <TouchableOpacity
            style = {styles.button}
            onPress = {() => this.favorite(post)}>
            <Icon
              name = "star"
              size = {16}
              color = {this.getFavoriteColor(post)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
            onPress = {() => this.messages(post)}>
            <Icon
              name = "feedback"
              size = {16}
              color = "green"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  queryData(){
    alert("ASFD");
  }

  render() {
    return(
      <View style = {{flex: 1}}>
        <Header
          navigator = {this.props.navigator}
          text = "Home"
        />
        <SearchBar />
        <GridView
          dataSource = {this.state.items}
          renderRow = {this.renderRow.bind(this)}
          onRefresh = {this.queryData.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 2,
  },
  photo: {
    width: Dimensions.get("window").width / 3 - 6,
    height: Dimensions.get("window").width / 3 - 6,
  },
  buttonView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
  }
});

module.exports = Home;
