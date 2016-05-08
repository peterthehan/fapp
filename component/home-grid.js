'use strict';

const React = require('react-native');

const { Image, TouchableOpacity, } = React;

const GridView = require('react-native-grid-view');

const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');

class HomeGrid extends React.Component {

  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    let items = Array.apply(null, Array(this.props.items.length)).map((v, i) => {
      return { id: i, src: this.props.items[i] }
    });
    this.setState({ items });
  }

  render() {
    return (
      <GridView
        items = { this.state.items }
        itemsPerRow = { 3 }
        renderItem = { this.renderItem } />
    );
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        key = { item.id }
        style = {{width: windowSize.width / 3, height: windowSize.width / 3}}
        onPress = { () => {
          console.warn("Pressed image " + item.id);
        }} >
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }} />
      </TouchableOpacity>
    );
  }

}

module.exports = HomeGrid;
