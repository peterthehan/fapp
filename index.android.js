import React, { Component } from 'react';
import {
  AppRegistry, Image, TouchableOpacity, Text, TextInput,
} from 'react-native';
import PhotoGrid from 'react-native-photo-grid';

var pictures = [
  "http://www.technobuffalo.com/wp-content/uploads/2014/04/fast-food.jpg",
  "https://img.buzzfeed.com/buzzfeed-static/static/2015-06/5/12/campaign_images/webdr05/what-comfort-food-should-you-choose-based-on-your-2-11396-1433522422-14_dblbig.jpg",
  "http://www.latoro.com/wallpapers/food/18747-desktop-wallpapers-japanese-cuisine.jpg",
  "http://4.bp.blogspot.com/-r1R_sGJJ-6U/TpEyQz0TFiI/AAAAAAAAAF8/n9WbFZ1Ieug/s1600/yakisoba.jpg",
  "http://ww2.kqed.org/quest/wp-content/uploads/sites/39/2012/08/starbucks.jpg",
  "http://cdn.paper4pc.com/images/dessert-pictures-wallpaper-1.jpg",
];

class PoopProject extends Component {
  constructor() {
    super();
    // state all the variables that belong to the PoopProject object
    this.state = {
      // items is an empty array (to be filled later)
      items: []
    };
  }

  // this is called one time when the object is loaded
  componentDidMount() {
    // set the value for the item array
    let items = Array.apply(null, Array(pictures.length)).map((v, i) => {
      // each element in the array has 2 variables, id and src
      return { id: i, src: pictures[i] }
    });
    // update the items value of the PoopProject object
    this.setState({ items });
  }

  // this is what the PoopProject object is rendered as on screen
  render() {
    return(
      // create a photo grid object with the following parameters
      <PhotoGrid
        // data = what array the photo grid is filled with
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        // renderHeader = a field of PhotoGrid that is displayed on top
        renderHeader = { this.renderSearchBar }
        // renderItem = how each item of data is rendered
        renderItem = { this.renderItem }
      />
    );
  }

  renderSearchBar() {
    return(
      <TextInput
        keyboardType = { 'default' }
      />
    );
  }

  // item and itemSize are passed in by PhotoGrid when it renders each item
  renderItem(item, itemSize) {
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => {
          // Do Something
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    )
  }
}

AppRegistry.registerComponent('PoopProject', () => PoopProject);
