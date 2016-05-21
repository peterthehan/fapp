'use strict';

import React, {
  Component,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Firebase from 'firebase';

import GridView from '../components/grid-view';
import Header from '../components/header';

let database = new Firebase("poopapp1.firebaseio.com");

const pictures = [
  "https://img.buzzfeed.com/buzzfeed-static/static/2015-06/5/12/campaign_images/webdr05/what-comfort-food-should-you-choose-based-on-your-2-11396-1433522422-14_dblbig.jpg",
  "http://4.bp.blogspot.com/-r1R_sGJJ-6U/TpEyQz0TFiI/AAAAAAAAAF8/n9WbFZ1Ieug/s1600/yakisoba.jpg",
  "http://ww2.kqed.org/quest/wp-content/uploads/sites/39/2012/08/starbucks.jpg",
  "http://cdn.paper4pc.com/images/dessert-pictures-wallpaper-1.jpg"
];

class Profile extends Component {

  constructor(props) {
    super(props);

    var userid = props.state;
    var self = this;

    database.once("value", function(snapshot){
      var usersnapshot = snapshot.child("users/" + userid);
      var proPic = usersnapshot.val().profilePic;
      self.setState({
        name: usersnapshot.val().firstName + " " + usersnapshot.val().lastName,
        profilePic: proPic,
      });
    });

    this.state = {
      items: [],
      name: "",
      profilePic: "",
    };
  }

  componentDidMount() {
    let items = Array.apply(null, Array(pictures.length)).map((v, i) => {
      return {id: i, src: pictures[i]}
    });
    this.setState({items});
  }

  renderRow(rowData) {
    return (
      <TouchableOpacity
        key = {rowData.id}
        style = {styles.item}
        onPress = {() => {alert("Pressed image " + rowData.id);}}>
        <Image
          resizeMode = "cover"
          style = {{flex: 1}}
          source = {{uri: rowData.src}}
        />
      </TouchableOpacity>
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
          text = "Profile"
          hasBack = {true}
        />
        <View style = {{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30,
        }}>
          <Image
            style = {{
              width: 150,
              height: 150,
            }}
            //resizeMode = {Image.resizeMode.center}
            source = {{uri: this.state.profilePic}}
          />
          <Text style = {{fontSize: 42, color: '#000000',}}>
            {this.state.name}
          </Text>
        </View>
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
    margin: 10,
    width: 100,
    height: 100
  }
});

module.exports = Profile;
