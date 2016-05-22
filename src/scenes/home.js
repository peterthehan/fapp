'use strict';

import React, {
  Text,
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
import Modal from 'react-native-simple-modal';
import Profile from "../scenes/profile";
import Firebase from 'firebase';

let database = new Firebase("poopapp1.firebaseio.com");

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

const windowSize = Dimensions.get('window');

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      open: false,
      image: "",
      user: "",
      userPhoto: "",
      userID: "",
      description: "",
      isFavorite: false
    };
  }

  componentDidMount() {
    var myBlob = [];
    var self = this;

    database.once("value", function(snapshot){
      var postSnapshot = snapshot.child("posts");
      postSnapshot.forEach(function(postSnapshot) {
        var userid = postSnapshot.val().userID;
        var userSnapshot = snapshot.child("users/" + userid);
        var proPic = userSnapshot.val().profilePic;
        myBlob.push({
          postID: postSnapshot.key().toString(),
          userID: userid,
          user: postSnapshot.val().user,
          userPhoto: proPic,
          photo: postSnapshot.val().photoID,
          rating: postSnapshot.val().rating,
          description: postSnapshot.val().description,
        });
      });
      self.setState({dataSource: myBlob});
    });
  }

  picture(post){
    this.setState({open: true, image: post.photo, user: post.user, userPhoto: post.userPhoto, userID: post.userID, description: post.description, isFavorite: post.isFavorite});
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
            source = {{uri: post.photo}}
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
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}
          onRefresh = {this.queryData.bind(this)}
        />
        <Modal
           offset={this.state.offset}
           open={this.state.open}
           modalDidOpen={() => console.log('modal did open')}
           modalDidClose={() => this.setState({open: false})}
           style={{alignItems: 'center', borderRadius: 20, margin: 0}}>
           <View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => {this.props.navigator.push({component: Profile, state: this.state.userID});}}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      resizeMode = "cover"
                      style = {{borderRadius: 90, width: 20, height: 20, marginRight: 4}}
                      source = {{uri: this.state.userPhoto}}
                    />
                    <Text>{this.state.user}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({open: false})}>
                  <Icon name = "close"
                  size = {25}
                  borderWidth = {7}
                  color = "black"
                  />
                </TouchableOpacity>
              </View>
              <Image
                resizeMode = "cover"
                style = {{width: windowSize.width-10, height: windowSize.width-10}}
                source = {{uri: this.state.image}}
              />
              <View style = {styles.buttonViewModal}>
                <TouchableOpacity
                  style = {styles.button}
                  //TODO: Beter way to call corresponding messages
                  onPress = {() => {alert("Database access");}}>
                  <Icon
                    name = "star"
                    size = {28}
                    //TODO: Beter way to call corresponding messages
                    color = {(this.state.isFavorite) ? ("orange") : ("gray")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style = {styles.button}
                  //TODO: Beter way to call corresponding messages
                  onPress = {() => {alert("Go to messages page.");}}>
                  <Icon
                    name = "feedback"
                    size = {28}
                    color = "green"
                  />
                </TouchableOpacity>
              </View>
              <Text style={{marginTop: 5}}><Text style={{fontWeight: 'bold'}}>Description: </Text>{this.state.description}</Text>
           </View>
        </Modal>
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
  buttonViewModal: {
    justifyContent: 'flex-start',
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
