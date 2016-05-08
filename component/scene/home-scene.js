'use strict';

const React = require('react-native');
const { View, Text } = React;

const HomeGrid = require('../home-grid');
const SearchBar = require('../search-bar');

var pictures = [
  "http://i.imgur.com/MurQperr.jpg",
  "http://i.imgur.com/rINxvmK.jpg",
  "http://i.imgur.com/8l7QwvJ.jpg",
  "http://i.imgur.com/mgUKRJB.jpg",
  "http://i.imgur.com/ToIVlrR.jpg",
  "http://i.imgur.com/2uPjOqH.jpg",
  "http://i.imgur.com/5bvLfS4.jpg",
  "http://i.imgur.com/zrhfInt.jpg",
  "http://i.imgur.com/DGhq3m9.jpg",
  "http://i.imgur.com/BVHklgj.jpg",
  "http://i.imgur.com/vqJ4V5Q.jpg",
  "http://i.imgur.com/UWfsuSa.jpg",
  "http://i.imgur.com/Vjd7HLN.jpg",
  "http://i.imgur.com/v4ib0gR.jpg",
  "http://i.imgur.com/L2wRR4D.jpg",
  "http://i.imgur.com/aKlzFVh.jpg",
  "http://i.imgur.com/g8Mfhww.jpg",
  "http://i.imgur.com/9c4c1hA.jpg",
  "http://i.imgur.com/toBpa4D.jpg",
  "http://i.imgur.com/oAicSUg.jpg",
  "http://i.imgur.com/JqlPIqU.jpg"
];

class HomeScene extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return(
      <View>
        <SearchBar />
        <HomeGrid
          items = { pictures } />
      </View>
    );
  }

  onSearchSubmit(searchText) {
  }
}

export default HomeScene;
