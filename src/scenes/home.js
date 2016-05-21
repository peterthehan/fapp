'use strict';

import React, {
  Component,
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

import SearchBar from '../search-bar';

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
    let items = Array.apply(null, Array(pictures.length)).map((v, i) => {
      return {id: i, src: pictures[i]}
    });
    this.setState({items});
  }

  favorite(){
    alert("Favorite");
  }

  messages(){
    alert("Messages");
  }

  renderRow(rowData) {
    return (
      <View style = {styles.item}>
        <TouchableOpacity
          key = {rowData.id}
          style = {styles.photo}
          onPress = {() => {alert("Pressed image " + rowData.id);}}>
          <Image
            resizeMode = "cover"
            style = {{flex: 1}}
            source = {{uri: rowData.src}}
          />
        </TouchableOpacity>
        <View style = {styles.buttonView}>
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.favorite.bind(this)}>
            <Icon
              name = "star"
              size = {16}
              color = "orange"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.messages.bind(this)}>
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
    margin: 5,
  },
  photo: {
    width: 100,
    height: 100,
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
