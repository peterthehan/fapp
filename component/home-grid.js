'use strict';

const React = require('react-native');
const { Image, TouchableOpacity } = React;

const PhotoGrid = require('react-native-photo-grid');

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
    return(
      <PhotoGrid
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        renderItem = { this.renderItem } />
    );
  }

  renderItem(item, itemSize) {
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => {
          // Do Something
        }} >
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }} />
      </TouchableOpacity>
    )
  }
}

export default HomeGrid;
